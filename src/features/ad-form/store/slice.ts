import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { AdFormFields, AdFormMeta, AdFormState } from './types';

const initialState: AdFormState = {
  fields: null,
  meta: null,
  saving: false,
  saveError: null,
  saveSuccess: false,
};

export const adFormSlice = createSlice({
  name: 'adForm',
  initialState,
  reducers: {
    setFields(
      state,
      action: PayloadAction<{ fields: AdFormFields; meta: AdFormMeta }>,
    ) {
      state.fields = action.payload.fields;
      state.meta = action.payload.meta;
      state.saveSuccess = false;
      state.saveError = null;
    },
    updateFields(state, action: PayloadAction<Partial<AdFormFields>>) {
      if (state.fields) {
        state.fields = { ...state.fields, ...action.payload };
      }
    },
    setSaving(state, action: PayloadAction<boolean>) {
      state.saving = action.payload;
      if (action.payload) {
        state.saveError = null;
        state.saveSuccess = false;
      }
    },
    setSaveError(state, action: PayloadAction<string>) {
      state.saveError = action.payload;
      state.saving = false;
      state.saveSuccess = false;
    },
    setSaveSuccess(state, action: PayloadAction<AdFormMeta>) {
      state.saveSuccess = true;
      state.saving = false;
      state.saveError = null;
      state.meta = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  setFields,
  updateFields,
  setSaving,
  setSaveError,
  setSaveSuccess,
  reset,
} = adFormSlice.actions;

export default adFormSlice.reducer;
