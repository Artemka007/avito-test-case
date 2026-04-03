import type { RootState } from '@/app/store';

export const selectAdFormFields = (state: RootState) => state.adForm.fields;
export const selectAdFormMeta = (state: RootState) => state.adForm.meta;
export const selectAdFormSaving = (state: RootState) => state.adForm.saving;
export const selectAdFormSaveError = (state: RootState) =>
  state.adForm.saveError;
export const selectAdFormSaveSuccess = (state: RootState) =>
  state.adForm.saveSuccess;
