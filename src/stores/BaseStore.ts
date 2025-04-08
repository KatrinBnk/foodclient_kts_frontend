import { makeObservable, observable, action } from 'mobx';

export class BaseStore {
  loading = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      setLoading: action,
      setError: action,
    });
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }

  setError(error: string | null): void {
    this.error = error;
  }

  protected async handleApiCall<T>(apiCall: () => Promise<T>): Promise<T | null> {
    try {
      this.setLoading(true);
      this.setError(null);
      return await apiCall();
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Произошла ошибка');
      return null;
    } finally {
      this.setLoading(false);
    }
  }
}
