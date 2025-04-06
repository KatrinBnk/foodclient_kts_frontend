import { makeObservable, observable, action } from 'mobx';
import { BaseStore } from './BaseStore';
import { getRecipeById } from '../utils/api';
import { DetailedRecipe } from '@/types';

export class RecipeDetailsStore extends BaseStore {
  recipe: DetailedRecipe | null = null;
  private currentRecipeId: string | null = null;
  private isRequestInProgress: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      recipe: observable,
      fetchRecipeById: action,
      clearRecipe: action,
      setRecipe: action,
    });
  }

  setRecipe(recipe: DetailedRecipe | null) {
    this.recipe = recipe;
  }

  async fetchRecipeById(id: string) {
    if (this.isRequestInProgress || (this.currentRecipeId === id && this.recipe)) {
      return;
    }

    try {
      this.isRequestInProgress = true;
      this.currentRecipeId = id;
      const result = await this.handleApiCall(() => getRecipeById(id));
      if (result) {
        this.setRecipe(result.data);
      }
    } finally {
      this.isRequestInProgress = false;
    }
  }

  clearRecipe() {
    this.setRecipe(null);
    this.currentRecipeId = null;
  }
}
