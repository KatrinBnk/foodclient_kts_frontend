import { makeObservable, computed } from 'mobx';
import RecipeStore from '@stores/RecipeStore';
import RecipeDetailsStore from '@stores/RecipeDetailsStore';
import CategoryStore from '@stores/CategoryStore';
import SavedRecipesStore from '@stores/SavedRecipesStore';
import AuthStore from '@stores/AuthStore';

export class RootStore {
  private _recipeStore: RecipeStore | null = null;
  private _categoryStore: CategoryStore | null = null;
  private _savedRecipesStore: SavedRecipesStore | null = null;
  private _recipeDetailsStore: RecipeDetailsStore | null = null;
  private _authStore: AuthStore | null = null;

  constructor() {
    makeObservable(this, {
      recipeStore: computed,
      categoryStore: computed,
      savedRecipesStore: computed,
      recipeDetailsStore: computed,
      authStore: computed,
    });
  }

  get recipeStore(): RecipeStore {
    if (!this._recipeStore) {
      this._recipeStore = new RecipeStore();
    }
    return this._recipeStore;
  }

  get categoryStore(): CategoryStore {
    if (!this._categoryStore) {
      this._categoryStore = new CategoryStore();
    }
    return this._categoryStore;
  }

  get savedRecipesStore(): SavedRecipesStore {
    if (!this._savedRecipesStore) {
      this._savedRecipesStore = new SavedRecipesStore();
    }
    return this._savedRecipesStore;
  }

  get recipeDetailsStore(): RecipeDetailsStore {
    if (!this._recipeDetailsStore) {
      this._recipeDetailsStore = new RecipeDetailsStore();
    }
    return this._recipeDetailsStore;
  }

  get authStore(): AuthStore {
    if (!this._authStore) {
      this._authStore = new AuthStore();
    }
    return this._authStore;
  }
}

export const rootStore = new RootStore();
