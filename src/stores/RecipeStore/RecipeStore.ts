import { makeObservable, observable, action, computed } from 'mobx';
import { BaseStore } from '@stores/BaseStore.ts';
import { getRecipes } from '@utils/api.ts';
import { BaseRecipe } from '@types';
import QueryParamsStore from '@stores/QueryParamsStore';
import { IPaginationMeta, ITotalTimeRange, ICaloriesRange } from './interfaces.ts';

export default class RecipeStore extends BaseStore {
  searchQuery = '';
  currentPage = 1;
  meta: IPaginationMeta | null = null;
  selectedCategories: number[] = [];
  isVegetarian = false;
  calories: ICaloriesRange = {};
  totalTime: ITotalTimeRange = {};

  private _queryParamsStore: QueryParamsStore;
  private _recipes: BaseRecipe[] = [];
  private _isRequestInProgress: boolean = false;
  private _lastRequestParams: string = '';
  private _pageSize = 9; //NOTE: это константа и по хорошему ее бы отсюда убарть

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

  setIsVegetarian(isVegetarian: boolean): void {
    this.isVegetarian = isVegetarian;
    this.currentPage = 1;
    if (isVegetarian) {
      this._queryParamsStore.setParam('vegetarian', 'true');
    } else {
      this._queryParamsStore.removeParam('vegetarian');
    }
    this._queryParamsStore.setParam('page', '1');
    this.fetchRecipes();
  }

  setCalories(calories: ICaloriesRange): void {
    this.calories = calories;
    this.currentPage = 1;
    if (calories.min !== undefined || calories.max !== undefined) {
      const params = [];
      if (calories.min !== undefined) {
        params.push(`min=${calories.min}`);
      }
      if (calories.max !== undefined) {
        params.push(`max=${calories.max}`);
      }
      this._queryParamsStore.setParam('calories', params.join('&'));
    } else {
      this._queryParamsStore.removeParam('calories');
    }
    this._queryParamsStore.setParam('page', '1');
    this.fetchRecipes();
  }

  setTotalTime(totalTime: ITotalTimeRange): void {
    this.totalTime = totalTime;
    this.currentPage = 1;
    if (totalTime.min !== undefined || totalTime.max !== undefined) {
      const params = [];
      if (totalTime.min !== undefined) {
        params.push(`min=${totalTime.min}`);
      }
      if (totalTime.max !== undefined) {
        params.push(`max=${totalTime.max}`);
      }
      this._queryParamsStore.setParam('totalTime', params.join('&'));
    } else {
      this._queryParamsStore.removeParam('totalTime');
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
      this.currentPage = parseInt(pageFromUrl, 10);
    }
    if (searchFromUrl) {
      this.searchQuery = searchFromUrl;
    }
    if (categoriesFromUrl) {
      this.selectedCategories = categoriesFromUrl.split(',').map(Number);
    }
    if (vegetarianFromUrl) {
      this.isVegetarian = vegetarianFromUrl === 'true';
    }
    this.calories = this.parseCaloriesFromUrl(caloriesFromUrl);
    this.totalTime = this.parseTotalTimeFromUrl(totalTimeFromUrl);

    this.fetchRecipes();
  }

  private parseCaloriesFromUrl(caloriesFromUrl: string | null): ICaloriesRange {
    if (!caloriesFromUrl) {
      return {};
    }

    const params = new URLSearchParams(caloriesFromUrl);
    const min = params.get('min');
    const max = params.get('max');

    return {
      min: min ? parseInt(min, 10) : undefined,
      max: max ? parseInt(max, 10) : undefined,
    };
  }

  private parseTotalTimeFromUrl(totalTimeFromUrl: string | null): ITotalTimeRange {
    if (!totalTimeFromUrl) {
      return {};
    }

    const params = new URLSearchParams(totalTimeFromUrl);
    const min = params.get('min');
    const max = params.get('max');

    return {
      min: min ? parseInt(min, 10) : undefined,
      max: max ? parseInt(max, 10) : undefined,
    };
  }
}
