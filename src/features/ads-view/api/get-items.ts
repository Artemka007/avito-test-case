import { apiClient } from '@/shared/api/client';

import type { GetItemsQuery, GetItemsResponse } from './contracts';

/**
 * GET /items
 *
 * Получает список объявлений с опциональной фильтрацией, поиском,
 * сортировкой и пагинацией.
 *
 * Параметр `categories` принимает массив значений ItemCategories и
 * автоматически сериализуется в строку через запятую, как ожидает сервер.
 */
export async function getItems(
  query: Omit<GetItemsQuery, 'categories'> & {
    categories?: GetItemsQuery['categories'];
  } = {},
  signal?: AbortSignal,
): Promise<GetItemsResponse> {
  const { data } = await apiClient.get<GetItemsResponse>('/items', {
    params: query,
    signal,
  });

  return data;
}
