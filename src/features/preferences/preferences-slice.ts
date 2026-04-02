import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';
export type AdsLayout = 'grid' | 'list';

export type PreferencesState = {
  theme: ThemeMode;
  adsLayout: AdsLayout;
};

const PREFERENCES_STORAGE_KEY = 'avito.preferences';

const defaultState: PreferencesState = {
  theme: 'light',
  adsLayout: 'grid',
};

function getInitialState(): PreferencesState {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  const saved = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);

  if (!saved) {
    return defaultState;
  }

  try {
    return {
      ...defaultState,
      ...(JSON.parse(saved) as Partial<PreferencesState>),
    };
  } catch {
    return defaultState;
  }
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: getInitialState(),
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setAdsLayout(state, action: PayloadAction<AdsLayout>) {
      state.adsLayout = action.payload;
    },
  },
});

export const { setAdsLayout, setTheme, toggleTheme } = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
