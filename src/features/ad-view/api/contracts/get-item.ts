import type { ItemParams } from '@/shared/api/contracts';
import type { ItemCategories } from '@/features/ads-view/store/enums';

/**
 * Полный объект объявления, возвращаемый при запросе одной карточки.
 *
 * В отличие от элемента списка (GetItemsResponseItem) содержит:
 * — описание (description)
 * — дату публикации (createdAt)
 * — набор параметров, зависящих от категории (params)
 */
export type GetItemResponse = {
  id: string;
  category: ItemCategories;
  title: string;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  params: ItemParams;
  /** Вычисляется на сервере: true, если не заполнены description или любые params */
  needsRevision: boolean;
};
