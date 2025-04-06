import { makeObservable, observable } from 'mobx';
import { BaseStore } from './BaseStore';
import { URLStateManager } from './URLStateManager';

export class QueryParamsStore extends BaseStore {
  private static instance: QueryParamsStore;
  params: Record<string, string> = {};

  static getInstance(): QueryParamsStore {
    if (!QueryParamsStore.instance) {
      QueryParamsStore.instance = new QueryParamsStore();
    }
    return QueryParamsStore.instance;
  }

  private constructor() {
    super();
    this.params = URLStateManager.getAllParams();

    makeObservable<Partial<QueryParamsStore>>(this, {
      params: observable,
    });

    window.addEventListener('popstate', () => {
      this.syncWithUrl();
    });
  }

  getParam(key: string): string | null {
    return this.params[key] ?? null;
  }

  setParam(key: string, value: string) {
    this.params[key] = value;
    URLStateManager.syncWithURL({ [key]: value });
  }

  removeParam(key: string) {
    delete this.params[key];
    URLStateManager.syncWithURL({ [key]: null });
  }

  syncWithUrl() {
    this.params = URLStateManager.getAllParams();
  }
}
