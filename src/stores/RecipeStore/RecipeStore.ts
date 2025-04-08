import { makeObservable, observable, action, computed } from 'mobx';
import { BaseStore } from '@stores/BaseStore.ts';
import { getRecipes } from '@utils/api.ts';
import { BaseRecipe } from '@types';
import QueryParamsStore from '@stores/QueryParamsStore';
import { IPaginationMeta } from './interfaces.ts';

export default class RecipeStore extends BaseStore {

  searchQuery = '';
  currentPage = 1;
  meta: IPaginationMeta | null = null;
  selectedCategories: number[] = [];

  private _queryParamsStore: QueryParamsStore;
  private _recipes: BaseRecipe[] = [];
  private _isRequestInProgress: boolean = false;
  private _lastRequestParams: string = '';
  private _pageSize = 9; //NOTE: это константа и по хорошему ее бы отсюда убарть

  constructor() {
    super();
    this._queryParamsStore = QueryParamsStore.getInstance();

    const pageFromUrl = this._queryParamsStore.getParam('page');
    const searchFromUrl = this._queryParamsStore.getParam('search');
    const categoriesFromUrl = this._queryParamsStore.getParam('categories');

    if (pageFromUrl) {
      this.currentPage = parseInt(pageFromUrl, 10);
    }
    if (searchFromUrl) {
      this.searchQuery = searchFromUrl;
    }
    if (categoriesFromUrl) {
      this.selectedCategories = categoriesFromUrl.split(',').map(Number);
    }

    makeObservable<this, '_recipes' | 'setRecipes'>(this, {
      _recipes: observable,
      searchQuery: observable,
      currentPage: observable,
      meta: observable,
      setMeta: action,
      selectedCategories: observable,
      setSearchQuery: action,
      setRecipes: action,
      setCurrentPage: action,
      setSelectedCategories: action,
      fetchRecipes: action,
      hasNextPage: computed,
      hasPrevPage: computed,
      totalPages: computed,
    });
  }

  get recipes(): BaseRecipe[] {
    return this._recipes;
  }

  get hasNextPage(): boolean {
    return this.meta ? this.currentPage < this.meta.pageCount : false;
  }

  get hasPrevPage(): boolean {
    return this.currentPage > 1;
  }

  get totalPages(): number {
    return this.meta?.pageCount || 0;
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this._queryParamsStore.setParam('search', query);
    this._queryParamsStore.setParam('page', '1');
    this.fetchRecipes();
  }

  setSelectedCategories(categories: number[]): void {
    this.selectedCategories = categories;
    this.currentPage = 1;
    if (categories.length > 0) {
      this._queryParamsStore.setParam('categories', categories.join(','));
    } else {
      this._queryParamsStore.removeParam('categories');
    }
    this._queryParamsStore.setParam('page', '1');
    this.fetchRecipes();
  }

  async setCurrentPage(page: number): Promise<void> {
    if (page < 1 || (this.meta && page > this.meta.pageCount)) {
      return;
    }

    this.currentPage = page;
    this._queryParamsStore.setParam('page', page.toString());
    await this.fetchRecipes();
  }

  async fetchRecipes(): Promise<void> {
    const currentParams = this.getRequestParamsKey();

    if (this._isRequestInProgress || this._lastRequestParams === currentParams) {
      return;
    }

    try {
      this._isRequestInProgress = true;
      this._lastRequestParams = currentParams;

      const result = await this.handleApiCall(() =>
        getRecipes({
          page: this.currentPage,
          pageSize: this._pageSize,
          query: this.searchQuery,
          categories: this.selectedCategories,
        })
      );

      if (result) {
        this.setRecipes(result.data);
        this.setMeta(result.meta.pagination);
      }
    } finally {
      this._isRequestInProgress = false;
    }
  }

  private setRecipes(recipes: BaseRecipe[]): void {
    this._recipes = recipes;
  }

  private setMeta(meta: IPaginationMeta): void {
    if (meta.pageCount > 0 && this.currentPage > meta.pageCount) {
      this.setCurrentPage(meta.pageCount);
    }
    this.meta = meta;
  }

  private getRequestParamsKey(): string {
    return JSON.stringify({
      page: this.currentPage,
      pageSize: this._pageSize,
      query: this.searchQuery,
      categories: this.selectedCategories,
    });
  }
}
