import { makeObservable, observable, action, computed } from 'mobx';
import { BaseStore } from '@stores/BaseStore.ts';
import { getCategories } from '@utils/api.ts';
import QueryParamsStore from '@stores/QueryParamsStore';
import { ICategory } from './interfaces.ts';

export default class CategoryStore extends BaseStore {
  selectedIds: number[] = [];

  private _categories: ICategory[] = [];
  private _initialized = false;
  private _queryParamsStore: QueryParamsStore;

  constructor() {
    super();
    this._queryParamsStore = QueryParamsStore.getInstance();

    const categoriesFromUrl = this._queryParamsStore.getParam('categories');
    if (categoriesFromUrl) {
      this.selectedIds = categoriesFromUrl.split(',').map(Number);
    }

    makeObservable<this, '_categories' | 'setCategories'>(this, {
      _categories: observable,
      selectedIds: observable,
      setSelectedIds: action,
      initialize: action,
      setCategories: action,
      selectedCategories: computed,
      categoryOptions: computed,
    });
  }

  get categories(): ICategory[] {
    return this._categories;
  }

  get selectedCategories(): ICategory[] {
    return this.categories.filter((category) => this.selectedIds.includes(category.id));
  }

  get categoryOptions(): Array<{ key: string; value: string }> {
    return this.categories.map((category) => ({
      key: category.id.toString(),
      value: category.title,
    }));
  }

  async initialize(): Promise<void> {
    if (this._initialized) return;
    if (this.loading) return;
    await this.fetchCategories();
    this._initialized = true;
  }

  setSelectedIds(ids: number[]): void {
    this.selectedIds = ids;
    this._queryParamsStore.setParam('page', '1');

    if (ids.length > 0) {
      this._queryParamsStore.setParam('categories', ids.join(','));
    } else {
      this._queryParamsStore.removeParam('categories');
    }
  }

  private async fetchCategories(): Promise<void> {
    const result = await this.handleApiCall(getCategories);
    if (result) {
      this.setCategories(result.data);
    }
  }

  private setCategories(categories: ICategory[]): void {
    this._categories = categories;
  }
}
