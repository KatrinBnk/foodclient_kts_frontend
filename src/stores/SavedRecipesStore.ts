import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { BaseStore } from './BaseStore';
import { ShortRecipe } from '@/types';
import { getRecipeById } from '@/utils/api';

export class SavedRecipesStore extends BaseStore {
  savedRecipesIds: string[] = [];
  savedRecipesDetails: ShortRecipe[] = [];
  isLoading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      savedRecipesIds: observable,
      savedRecipesDetails: observable,
      isLoading: observable,
      saveRecipe: action,
      removeRecipe: action,
      loadSavedRecipes: action,
      fetchSavedRecipesDetails: action,
      isRecipeSaved: computed,
    });
    this.loadSavedRecipes();
  }

  loadSavedRecipes() {
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      this.savedRecipesIds = JSON.parse(saved);
      if (this.savedRecipesIds.length > 0) {
        this.fetchSavedRecipesDetails();
      }
    }
  }

  async fetchSavedRecipesDetails() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    try {
      const recipes = await Promise.all(
        this.savedRecipesIds.map(async (id) => {
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
        this.savedRecipesDetails = recipes.filter((recipe): recipe is ShortRecipe => recipe !== null);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  saveRecipe(documentId: string) {
    if (!this.savedRecipesIds.includes(documentId)) {
      this.savedRecipesIds = [...this.savedRecipesIds, documentId];
      localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipesIds));
      
      getRecipeById(documentId).then(response => {
        runInAction(() => {
          this.savedRecipesDetails = [...this.savedRecipesDetails, response.data];
        });
      }).catch(error => {
        console.error(`Error fetching new recipe ${documentId}:`, error);
      });
    }
  }

  removeRecipe(documentId: string) {
    this.savedRecipesIds = this.savedRecipesIds.filter(id => id !== documentId);
    this.savedRecipesDetails = this.savedRecipesDetails.filter(recipe => recipe.documentId !== documentId);
    localStorage.setItem('savedRecipes', JSON.stringify(this.savedRecipesIds));
  }

  get isRecipeSaved(): (documentId: string) => boolean {
    return (documentId: string) => this.savedRecipesIds.includes(documentId);
  }
}