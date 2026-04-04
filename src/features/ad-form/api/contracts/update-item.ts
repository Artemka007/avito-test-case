import type { ItemParams } from '@/shared/api/contracts';
import type { ItemCategories } from '@/features/ads-view/store/enums';

/**
 * Контракт тела запроса PUT /items/:id.
 *
 * Операция полной замены (full replace) — все обязательные поля
 * должны присутствовать при каждом вызове.
 */
export type UpdateItemBody = {
  category: ItemCategories;
  title: string;
  price: number;
  description?: string;
  params: ItemParams;
};

/**
 * Сервер возвращает обновлённый объект объявления.
 */
export type UpdateItemResponse = {
  id: string;
  category: ItemCategories;
  title: string;
  price: number;
  description?: string;
  createdAt: string;
  params: ItemParams;
  needsRevision: boolean;
};
