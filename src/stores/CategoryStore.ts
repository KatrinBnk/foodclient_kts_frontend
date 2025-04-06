import { makeObservable, observable, action, computed } from 'mobx';
import { BaseStore } from './BaseStore';
import { getCategories } from '../utils/api';
import { QueryParamsStore } from './QueryParamsStore';

export interface Category {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export class CategoryStore extends BaseStore {
  categories: Category[] = [];
  selectedIds: number[] = [];
  private _initialized = false;
  private queryParamsStore: QueryParamsStore;

  constructor() {
    super();
    this.queryParamsStore = QueryParamsStore.getInstance();

    const categoriesFromUrl = this.queryParamsStore.getParam('categories');
    if (categoriesFromUrl) {
      this.selectedIds = categoriesFromUrl.split(',').map(Number);
    }

    makeObservable(this, {
      categories: observable,
      selectedIds: observable,
      setCategories: action,
      setSelectedIds: action,
      initialize: action,
      selectedCategories: computed,
      categoryOptions: computed,
    });
  }

  async initialize() {
    if (this._initialized) return;
    await this.fetchCategories();
    this._initialized = true;
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  setSelectedIds(ids: number[]) {
    this.selectedIds = ids;
    this.queryParamsStore.setParam('page', '1');

    if (ids.length > 0) {
      this.queryParamsStore.setParam('categories', ids.join(','));
    } else {
      this.queryParamsStore.removeParam('categories');
    }
  }

  private async fetchCategories() {
    const result = await this.handleApiCall(getCategories);
    if (result) {
      this.setCategories(result.data);
    }
  }

  get selectedCategories() {
    return this.categories.filter((category) => this.selectedIds.includes(category.id));
  }

  get categoryOptions() {
    return this.categories.map((category) => ({
      key: category.id.toString(),
      value: category.title,
    }));
  }
}
