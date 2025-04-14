import { createContext } from 'react';
import { rootStore } from '@stores/RootStore';

export const StoreContext = createContext<typeof rootStore>(rootStore);
