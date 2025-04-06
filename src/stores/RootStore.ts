import { makeObservable, observable } from 'mobx';
import { RecipeStore } from './RecipeStore';
import { RecipeDetailsStore } from './RecipeDetailsStore';
import { CategoryStore } from './CategoryStore';

export class RecipeListPageStore {
  recipeStore: RecipeStore;
  categoryStore: CategoryStore;

  constructor() {
    makeObservable(this, {
      recipeStore: observable,
      categoryStore: observable,
    });

    this.categoryStore = new CategoryStore();
    this.recipeStore = new RecipeStore();
  }
}

export class RecipeDetailPageStore {
  recipeDetailsStore: RecipeDetailsStore;

  constructor() {
    makeObservable(this, {
      recipeDetailsStore: observable,
    });

    this.recipeDetailsStore = new RecipeDetailsStore();
  }
}

export class RootStore {
  recipeListPageStore: RecipeListPageStore;
  recipeDetailPageStore: RecipeDetailPageStore;

  constructor() {
    makeObservable(this, {
      recipeListPageStore: observable,
      recipeDetailPageStore: observable,
    });

    this.recipeListPageStore = new RecipeListPageStore();
    this.recipeDetailPageStore = new RecipeDetailPageStore();
  }
}

export const rootStore = new RootStore();
