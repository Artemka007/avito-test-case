import type { RootState } from '@/app/store';

export const selectItemsView = (state: RootState) => state.adsView.itemsView;
export const selectCurrentPage = (state: RootState) =>
  state.adsView.currentPage;
export const selectItemsPerPage = (state: RootState) =>
  state.adsView.itemsPerPage;
export const selectTotal = (state: RootState) => state.adsView.total;
export const selectSortOption = (state: RootState) => state.adsView.sortOption;
export const selectQuery = (state: RootState) => state.adsView.query;
export const selectFilter = (state: RootState) => state.adsView.filter;
export const selectItems = (state: RootState) => state.adsView.items;
