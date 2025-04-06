import { useContext } from 'react';
import { StoreContext } from '@stores/context';

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

export const useRecipeListPage = () => {
  const store = useStore();
  return store.recipeListPageStore;
};

export const useRecipeDetailPage = () => {
  const store = useStore();
  return store.recipeDetailPageStore;
};
