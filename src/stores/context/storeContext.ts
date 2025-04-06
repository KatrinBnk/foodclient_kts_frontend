import { createContext } from 'react';
import { rootStore } from '../RootStore';

export const StoreContext = createContext<typeof rootStore>(rootStore);
