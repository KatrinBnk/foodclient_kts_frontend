import { makeObservable, observable, action } from 'mobx';
import { BaseStore } from '@stores/BaseStore';
import { getRecipeById } from '@utils/api';
import { DetailedRecipe } from '@types';

export default class RecipeDetailsStore extends BaseStore {

  private _recipe: DetailedRecipe | null = null;
  private _currentRecipeId: string | null = null;
  private _isRequestInProgress: boolean = false;

  constructor() {
    super();
    makeObservable<this, '_recipe' | 'setRecipe'>(this, {
      _recipe: observable,
      fetchRecipeById: action,
      setRecipe: action,
    });
  }

  get recipe(): DetailedRecipe | null {
    return this._recipe;
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
      }
    } finally {
      this._isRequestInProgress = false;
    }
  }

  private setRecipe(recipe: DetailedRecipe | null): void {
    this._recipe = recipe;
  }
}
