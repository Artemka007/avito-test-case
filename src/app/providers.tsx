import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { ThemeSync } from '@/features/preferences/theme-sync';

import { store } from './store';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeSync />
      {children}
    </Provider>
  );
}
