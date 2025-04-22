import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { BaseStore } from '@stores/BaseStore.ts';
import { BaseRecipe } from '@types';
import { getRecipeById } from '@utils/api.ts';
import { collection, doc, getDocs, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@configs/firebaseConfig';

export default class SavedRecipesStore extends BaseStore {
  private _savedRecipesIds: string[] = [];
  private _savedRecipesDetails: BaseRecipe[] = [];
  private readonly savedRecipesCollection = 'savedRecipes';

  constructor() {
    super();
    makeObservable<SavedRecipesStore, '_savedRecipesIds' | '_savedRecipesDetails'>(this, {
      _savedRecipesIds: observable,
      _savedRecipesDetails: observable,
      saveRecipe: action,
      removeRecipe: action,
      loadSavedRecipes: action,
      fetchSavedRecipesDetails: action,
      isRecipeSaved: computed,
    });
  }

  get isRecipeSaved(): (documentId: string) => boolean {
    return (documentId: string): boolean => this._savedRecipesIds.includes(documentId);
  }

  get savedRecipesIds(): string[] {
    return this._savedRecipesIds;
  }

  get savedRecipesDetails(): BaseRecipe[] {
    return this._savedRecipesDetails;
  }

  async loadSavedRecipes(userId: string): Promise<void> {
    if (!userId) return;

    await this.handleApiCall(async () => {
      const savedRecipesRef = collection(db, this.savedRecipesCollection);
      const q = query(savedRecipesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const recipeIds = querySnapshot.docs.map((doc) => doc.data().recipeId);

      runInAction(() => {
        this._savedRecipesIds = recipeIds;
      });

      if (recipeIds.length > 0) {
        await this.fetchSavedRecipesDetails();
      }
    });
  }

  async fetchSavedRecipesDetails(): Promise<void> {
    if (this.loading) return;

    await this.handleApiCall(async () => {
      const recipes = await Promise.all(
        this._savedRecipesIds.map(async (id) => {
          try {
            const response = await getRecipeById(id);
            return response.data;
          } catch (error) {
            console.error(`Error fetching recipe ${id}:`, error);
            return null;
          }
        })
      );
      runInAction(() => {
        this._savedRecipesDetails = recipes.filter(
          (recipe): recipe is BaseRecipe => recipe !== null
        );
      });
    });
  }

  async saveRecipe(documentId: string, userId: string): Promise<void> {
    if (!userId) return;

    await this.handleApiCall(async () => {
      const savedRecipeRef = doc(db, this.savedRecipesCollection, `${userId}_${documentId}`);
      await setDoc(savedRecipeRef, {
        userId,
        recipeId: documentId,
        savedAt: new Date().toISOString(),
      });

      runInAction(() => {
        if (!this._savedRecipesIds.includes(documentId)) {
          this._savedRecipesIds = [...this._savedRecipesIds, documentId];
        }
      });

      const response = await getRecipeById(documentId);
      runInAction(() => {
        this._savedRecipesDetails = [...this._savedRecipesDetails, response.data];
      });
    });
  }

  async removeRecipe(documentId: string, userId: string): Promise<void> {
    if (!userId) return;

    try {
      const savedRecipeRef = doc(db, this.savedRecipesCollection, `${userId}_${documentId}`);
      await deleteDoc(savedRecipeRef);

      runInAction(() => {
        this._savedRecipesIds = this._savedRecipesIds.filter((id) => id !== documentId);
        this._savedRecipesDetails = this._savedRecipesDetails.filter(
          (recipe) => recipe.documentId !== documentId
        );
      });
    } catch (error) {
      console.error(`Error removing recipe ${documentId}:`, error);
    }
  }
}
