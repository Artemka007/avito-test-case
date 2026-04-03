import type { GetItemResponse } from '../../api/contracts';

export type AdViewItem = GetItemResponse;

export type AdViewState = {
  item: AdViewItem | null;
  loading: boolean;
  error: string | null;
};
