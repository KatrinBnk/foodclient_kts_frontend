import { makeObservable, observable, action, computed, reaction } from 'mobx';
import { BaseStore } from '@stores/BaseStore.ts';
import { getRecipes } from '@utils/api.ts';
import { BaseRecipe } from '@types';
import QueryParamsStore from '@stores/QueryParamsStore';
import { IPaginationMeta, IRange } from './interfaces.ts';

export default class RecipeStore extends BaseStore {
  searchQuery = '';
  currentPage = 1;
  meta: IPaginationMeta | null = null;
  selectedCategories: number[] = [];
  isVegetarian = false;
  calories: IRange = {};
  totalTime: IRange = {};

  private _queryParamsStore: QueryParamsStore;
  private _recipes: BaseRecipe[] = [];
  private _isRequestInProgress: boolean = false;
  private _lastRequestParams: string = '';
  private _pageSize = 9;

  constructor() {
    super();
    this._queryParamsStore = QueryParamsStore.getInstance();
    this.syncWithUrl();

    window.addEventListener('popstate', () => {
      this.syncWithUrl();
    });

    makeObservable<this, '_recipes' | 'setRecipes' | 'setMeta'>(this, {
      _recipes: observable,
      searchQuery: observable,
      currentPage: observable,
      meta: observable,
      isVegetarian: observable,
      calories: observable,
      selectedCategories: observable,
      totalTime: observable,
      setMeta: action,
      setSearchQuery: action,
      setRecipes: action,
      setCurrentPage: action,
      setSelectedCategories: action,
      setIsVegetarian: action,
      setCalories: action,
      setTotalTime: action,
      fetchRecipes: action,
      hasNextPage: computed,
      hasPrevPage: computed,
      totalPages: computed,
    });

    reaction(
      () => ({
        searchQuery: this.searchQuery,
        currentPage: this.currentPage,
        selectedCategories: this.selectedCategories,
        isVegetarian: this.isVegetarian,
        calories: this.calories,
        totalTime: this.totalTime,
      }),
      () => {
        this.fetchRecipes();
      }
    );
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
    this.updateParam('search', query);
  }

  setSelectedCategories(categories: number[]): void {
    this.selectedCategories = categories;
    const value = categories.length ? categories.join(',') : undefined;
    this.updateParam('categories', value);
  }

  setIsVegetarian(isVegetarian: boolean): void {
    this.isVegetarian = isVegetarian;
    const value = isVegetarian ? 'true' : undefined;
    this.updateParam('vegetarian', value);
  }

  setCalories(calories: IRange): void {
    this.calories = calories;
    const value = this.formatRangeParam(calories);
    this.updateParam('calories', value);
  }

  setTotalTime(totalTime: IRange): void {
    this.totalTime = totalTime;
    const value = this.formatRangeParam(totalTime);
    this.updateParam('totalTime', value);
  }

  async setCurrentPage(page: number): Promise<void> {
    if (page < 1 || (this.meta && page > this.meta.pageCount)) {
      return;
    }

    this.currentPage = page;
    this._queryParamsStore.setParam('page', page.toString());
  }

  async fetchRecipes(): Promise<void> {
    const currentParams = this.getRequestParamsKey();

    if ((this._isRequestInProgress || this._lastRequestParams === currentParams) && this._recipes.length) {
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
          vegetarian: this.isVegetarian,
          calories: this.calories,
          totalTime: this.totalTime,
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
      vegetarian: this.isVegetarian,
      calories: this.calories,
      totalTime: this.totalTime,
    });
  }

  private syncWithUrl(): void {
    const pageFromUrl = this._queryParamsStore.getParam('page');
    const searchFromUrl = this._queryParamsStore.getParam('search');
    const categoriesFromUrl = this._queryParamsStore.getParam('categories');
    const vegetarianFromUrl = this._queryParamsStore.getParam('vegetarian');
    const caloriesFromUrl = this._queryParamsStore.getParam('calories');
    const totalTimeFromUrl = this._queryParamsStore.getParam('totalTime');

    if (pageFromUrl) {
      this.setCurrentPage(parseInt(pageFromUrl, 10));
    }
    if (searchFromUrl) {
      this.setSearchQuery(searchFromUrl);
    }
    if (categoriesFromUrl) {
      this.setSelectedCategories(categoriesFromUrl.split(',').map(Number));
    }
    if (vegetarianFromUrl) {
      this.setIsVegetarian(vegetarianFromUrl === 'true');
    }
    if (caloriesFromUrl) {
      this.setCalories(this.parseRangeFromUrl(caloriesFromUrl));
    }
    if (totalTimeFromUrl) {
      this.setTotalTime(this.parseRangeFromUrl(totalTimeFromUrl));
    }
  }

  private parseRangeFromUrl(rangeFromUrl: string | null): IRange {
    if (!rangeFromUrl) {
      return {};
    }

    const params = new URLSearchParams(rangeFromUrl);
    const min = params.get('min');
    const max = params.get('max');

    return {
      min: min ? parseInt(min, 10) : undefined,
      max: max ? parseInt(max, 10) : undefined,
    };
  }

  private updateParam(paramName: string, value: string | undefined, extra?: () => void): void {
    if (value && value !== '') {
      this._queryParamsStore.setParam(paramName, value);
    } else {
      this._queryParamsStore.removeParam(paramName);
    }
    extra?.();
  }

  private formatRangeParam(range: IRange): string | undefined {
    const params = [];
    if (range.min !== undefined) params.push(`min=${range.min}`);
    if (range.max !== undefined) params.push(`max=${range.max}`);
    return params.length ? params.join('&') : undefined;
  }
}