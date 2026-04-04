import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AdViewItem, AdViewState } from './types';

const initialState: AdViewState = {
  item: null,
  loading: false,
  error: null,
};

export const adViewSlice = createSlice({
  name: 'adView',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<AdViewItem>) {
      state.item = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    reset(state) {
      state.item = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setItem, setLoading, setError, reset } = adViewSlice.actions;

export default adViewSlice.reducer;
