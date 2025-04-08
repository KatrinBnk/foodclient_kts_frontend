import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { BaseStore } from '@stores/BaseStore.ts';
import { BaseRecipe } from '@types';
import { getRecipeById } from '@utils/api.ts';

export default class SavedRecipesStore extends BaseStore {

  private _savedRecipesIds: string[] = [];
  private _savedRecipesDetails: BaseRecipe[] = [];
  private _isLoading: boolean = false;

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
    this.loadSavedRecipes();
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

  loadSavedRecipes(): void {
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      this._savedRecipesIds = JSON.parse(saved);
      if (this.savedRecipesIds.length > 0) {
        this.fetchSavedRecipesDetails();
      }
    }
  }

  async fetchSavedRecipesDetails(): Promise<void> {
    if (this._isLoading) return;

    this._isLoading = true;
    try {
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
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  saveRecipe(documentId: string): void {
    if (!this._savedRecipesIds.includes(documentId)) {
      this._savedRecipesIds = [...this._savedRecipesIds, documentId];
      localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipesIds));

      getRecipeById(documentId)
        .then((response) => {
          runInAction(() => {
            this._savedRecipesDetails = [...this._savedRecipesDetails, response.data];
          });
        })
        .catch((error) => {
          console.error(`Error fetching new recipe ${documentId}:`, error);
        });
    }
  }

  removeRecipe(documentId: string): void {
    this._savedRecipesIds = this._savedRecipesIds.filter((id) => id !== documentId);
    this._savedRecipesDetails = this._savedRecipesDetails.filter(
      (recipe) => recipe.documentId !== documentId
    );
    localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipesIds));
  }
}
