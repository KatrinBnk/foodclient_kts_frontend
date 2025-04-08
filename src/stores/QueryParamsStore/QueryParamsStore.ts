import { makeObservable, observable } from 'mobx';
import { BaseStore } from '@stores/BaseStore.ts';
import { URLStateManager } from './URLStateManager.ts';

export default class QueryParamsStore extends BaseStore {

  params: Record<string, string> = {};
  private static _instance: QueryParamsStore | null = null;

  private constructor() {
    super();
    this.params = URLStateManager.getAllParams();

    makeObservable<Partial<QueryParamsStore>>(this, {
      params: observable,
    });

    window.addEventListener('popstate', (): void => {
      this.syncWithUrl();
    });
  }

  static getInstance(): QueryParamsStore {
    if (!QueryParamsStore._instance) {
      QueryParamsStore._instance = new QueryParamsStore();
    }
    return QueryParamsStore._instance;
  }

  getParam(key: string): string | null {
    return this.params[key] ?? null;
  }

  setParam(key: string, value: string): void {
    this.params[key] = value;
    URLStateManager.syncWithURL({ [key]: value });
  }

  removeParam(key: string): void {
    delete this.params[key];
    URLStateManager.syncWithURL({ [key]: null });
  }

  syncWithUrl(): void {
    this.params = URLStateManager.getAllParams();
  }
}
