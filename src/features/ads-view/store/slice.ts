import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item, Filter } from './types';
import { ItemCategories, ItemsView, SortOptions } from './enums';

export type State = {
  items: Item[];
  total: number;
  filter: Filter;
  sortOption: SortOptions;
  itemsView: ItemsView;
  query: string;
  currentPage: number;
  itemsPerPage: number;
};

const initialFilter: Filter = {
  categories: {
    [ItemCategories.Auto]: false,
    [ItemCategories.RealEstate]: false,
    [ItemCategories.Electronics]: false,
  },
  needsRevision: false,
};

const initialState: State = {
  items: [],
  total: 0,
  filter: initialFilter,
  sortOption: SortOptions.DateDesc,
  itemsView: ItemsView.Grid,
  query: '',
  currentPage: 1,
  itemsPerPage: 10,
};

export const adsViewSlice = createSlice({
  name: 'adsView',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    sort(state, action: PayloadAction<SortOptions>) {
      state.sortOption = action.payload;
      state.currentPage = 1;
    },
    changeView(state, action: PayloadAction<ItemsView>) {
      state.itemsView = action.payload;
    },
    search(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.currentPage = 1;
    },
    resetFilter(state) {
      state.filter = initialFilter;
      state.currentPage = 1;
    },
    resetQuery(state) {
      state.query = '';
      state.currentPage = 1;
    },
    toggleNeedsRevision(state) {
      state.filter.needsRevision = !state.filter.needsRevision;
      state.currentPage = 1;
    },
    toggleFilterCategory(state, action: PayloadAction<ItemCategories>) {
      const category = action.payload;
      state.filter.categories[category] = !state.filter.categories[category];
      state.currentPage = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const {
  setItems,
  setTotal,
  sort,
  changeView,
  search,
  resetFilter,
  resetQuery,
  toggleNeedsRevision,
  toggleFilterCategory,
  setPage,
  setItemsPerPage,
} = adsViewSlice.actions;

export default adsViewSlice.reducer;
