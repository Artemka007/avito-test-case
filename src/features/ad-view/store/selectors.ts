import type { RootState } from '@/app/store';

export const selectAdViewItem = (state: RootState) => state.adView.item;
export const selectAdViewLoading = (state: RootState) => state.adView.loading;
export const selectAdViewError = (state: RootState) => state.adView.error;
