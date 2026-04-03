import { apiClient } from '@/shared/api/client';

import type { UpdateItemBody, UpdateItemResponse } from './contracts';

export const updateItem = async (
  id: string,
  body: UpdateItemBody,
  signal?: AbortSignal,
): Promise<UpdateItemResponse> => {
  const { data } = await apiClient.put<UpdateItemResponse>(
    `/items/${id}`,
    body,
    {
      signal,
    },
  );

  return data;
};
