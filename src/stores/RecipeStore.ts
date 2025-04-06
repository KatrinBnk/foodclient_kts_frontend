import { makeObservable, observable, action, computed } from 'mobx';
import { BaseStore } from './BaseStore';
import { getRecipes } from '../utils/api';
import { BaseRecipe } from '@/types';
import { QueryParamsStore } from './QueryParamsStore';

interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export class RecipeStore extends BaseStore {
  recipes: BaseRecipe[] = [];
  searchQuery = '';
  currentPage = 1;
  pageSize = 9;
  meta: PaginationMeta | null = null;
  selectedCategories: number[] = [];

  private queryParamsStore: QueryParamsStore;
  private isRequestInProgress: boolean = false;
  private lastRequestParams: string = '';

  constructor() {
    super();
    this.queryParamsStore = QueryParamsStore.getInstance();

    // Инициализация из URL
    const pageFromUrl = this.queryParamsStore.getParam('page');
    const searchFromUrl = this.queryParamsStore.getParam('search');
    const categoriesFromUrl = this.queryParamsStore.getParam('categories');

    if (pageFromUrl) {
      this.currentPage = parseInt(pageFromUrl, 10);
    }
    if (searchFromUrl) {
      this.searchQuery = searchFromUrl;
    }
    if (categoriesFromUrl) {
      this.selectedCategories = categoriesFromUrl.split(',').map(Number);
    }

    makeObservable(this, {
      recipes: observable,
      searchQuery: observable,
      currentPage: observable,
      pageSize: observable,
      meta: observable,
      selectedCategories: observable,
      setSearchQuery: action,
      setRecipes: action,
      setCurrentPage: action,
      setSelectedCategories: action,
      setMeta: action,
      fetchRecipes: action,
      filteredRecipes: computed,
      hasNextPage: computed,
      hasPrevPage: computed,
      totalPages: computed,
    });
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
    this.queryParamsStore.setParam('search', query);
    this.queryParamsStore.setParam('page', '1');
    this.fetchRecipes();
  }

  setSelectedCategories(categories: number[]) {
    this.selectedCategories = categories;
    this.currentPage = 1;
    if (categories.length > 0) {
      this.queryParamsStore.setParam('categories', categories.join(','));
    } else {
      this.queryParamsStore.removeParam('categories');
    }
    this.queryParamsStore.setParam('page', '1');
    this.fetchRecipes();
  }

  setRecipes(recipes: BaseRecipe[]) {
    this.recipes = recipes;
  }

  async setCurrentPage(page: number) {
    if (page < 1 || (this.meta && page > this.meta.pageCount)) {
      return;
    }

    this.currentPage = page;
    this.queryParamsStore.setParam('page', page.toString());
    await this.fetchRecipes();
  }

  setMeta(meta: PaginationMeta) {
    if (meta.pageCount > 0 && this.currentPage > meta.pageCount) {
      this.setCurrentPage(meta.pageCount);
    }
    this.meta = meta;
  }

  private getRequestParamsKey(): string {
    return JSON.stringify({
      page: this.currentPage,
      pageSize: this.pageSize,
      query: this.searchQuery,
      categories: this.selectedCategories,
    });
  }

  async fetchRecipes() {
    const currentParams = this.getRequestParamsKey();

    if (this.isRequestInProgress || this.lastRequestParams === currentParams) {
      return;
    }

    try {
      this.isRequestInProgress = true;
      this.lastRequestParams = currentParams;

      const result = await this.handleApiCall(() =>
        getRecipes({
          page: this.currentPage,
          pageSize: this.pageSize,
          query: this.searchQuery,
          categories: this.selectedCategories,
        })
      );

      if (result) {
        this.setRecipes(result.data);
        this.setMeta(result.meta.pagination);
      }
    } finally {
      this.isRequestInProgress = false;
    }
  }

  get filteredRecipes() {
    return this.recipes;
  }

  get hasNextPage() {
    return this.meta ? this.currentPage < this.meta.pageCount : false;
  }

  get hasPrevPage() {
    return this.currentPage > 1;
  }

  get totalPages() {
    return this.meta?.pageCount || 0;
  }
}
