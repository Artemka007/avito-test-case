import { configureStore } from '@reduxjs/toolkit';

import { preferencesReducer } from '@/features/preferences/preferences-slice';
import { adsViewReducer } from '@/features/ads-view/store';
import { adViewReducer } from '@/features/ad-view/store';
import { adFormReducer } from '@/features/ad-form/store';

const PREFERENCES_STORAGE_KEY = 'avito.preferences';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    adsView: adsViewReducer,
    adView: adViewReducer,
    adForm: adFormReducer,
  },
});

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const { preferences } = store.getState();
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(preferences),
    );
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
