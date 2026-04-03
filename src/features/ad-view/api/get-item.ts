import { apiClient } from '@/shared/api/client';

import type { GetItemResponse } from './contracts';

export const getItem = async (
  id: string,
  signal?: AbortSignal,
): Promise<GetItemResponse> => {
  const { data } = await apiClient.get<GetItemResponse>(`/items/${id}`, {
    signal,
  });

  return data;
};
