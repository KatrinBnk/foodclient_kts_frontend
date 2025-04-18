import { makeObservable, observable, action } from 'mobx';
import { BaseStore } from '@stores/BaseStore';
import { getRecipeById } from '@utils/api';
import { DetailedRecipe } from '@types';

export default class RecipeDetailsStore extends BaseStore {
  private _recipe: DetailedRecipe | null = null;
  private _currentRecipeId: string | null = null;
  private _isRequestInProgress: boolean = false;
  private _servings: number = 1;

  constructor() {
    super();
    makeObservable<this, '_recipe' | 'setRecipe' | '_servings'>(this, {
      _recipe: observable,
      _servings: observable,
      fetchRecipeById: action,
      setRecipe: action,
      setServings: action,
    });
  }

  get recipe(): DetailedRecipe | null {
    return this._recipe;
  }

  get servings(): number {
    return this._servings;
  }

  get recalculatedIngredients() {
    if (!this._recipe) return [];

    const originalServings = this._recipe.servings || 1;
    const multiplier = this._servings / originalServings;

    return this._recipe.ingradients.map((ingredient) => ({
      ...ingredient,
      amount: ingredient.amount * multiplier,
    }));
  }

  setServings(servings: number): void {
    if (servings > 0) {
      this._servings = servings;
    }
  }

  async fetchRecipeById(id: string): Promise<void> {
    if (this._isRequestInProgress || (this._currentRecipeId === id && this._recipe)) {
      return;
    }
    try {
      this._isRequestInProgress = true;
      this._currentRecipeId = id;
      const result = await this.handleApiCall(() => getRecipeById(id));
      if (result) {
        this.setRecipe(result.data);
        this.setServings( result.data.servings || 1);
      }
    } finally {
      this._isRequestInProgress = false;
    }
  }

  private setRecipe(recipe: DetailedRecipe | null): void {
    this._recipe = recipe;
  }
}
