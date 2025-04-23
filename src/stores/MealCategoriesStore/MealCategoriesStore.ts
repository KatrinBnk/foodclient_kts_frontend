import { makeObservable, observable, action } from 'mobx';
import { BaseStore } from '@stores/BaseStore';
import { getCategories } from '@utils/api';
import { IMealCategory } from '@stores/MealCategoriesStore/interfaces.ts';

export default class MealCategoriesStore extends BaseStore {
  categories: IMealCategory[] = [];

  constructor() {
    super();
    makeObservable(this, {
      categories: observable,
      fetchCategories: action,
      setCategories: action,
    });
  }

  async fetchCategories(): Promise<void> {
    const result = await this.handleApiCall(getCategories);
    if (result) {
      this.setCategories(result.data);
    }
  }

  setCategories(categories: IMealCategory[]): void {
    this.categories = categories;
  }

  getRecipeNames(category: IMealCategory): string {
    if (category.recipes.length === 0) {
      return 'No recipes in category';
    }
    return category.recipes.map((recipe) => recipe.name).join(', ');
  }
}
