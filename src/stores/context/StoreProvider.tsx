import React from 'react';
import { rootStore } from '@stores/RootStore';
import { StoreContext } from './storeContext';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
