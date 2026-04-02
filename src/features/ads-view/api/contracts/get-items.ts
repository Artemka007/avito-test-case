import type { ItemCategories } from '../../store/enums';

/**
 * Столбец для сортировки
 * Соответствует параметру ?sortColumn= на сервере
 */
export type GetItemsSortColumn = 'title' | 'createdAt';

/**
 * Направление сортировки
 * Соответствует параметру ?sortDirection= на сервере
 */
export type GetItemsSortDirection = 'asc' | 'desc';

/**
 * Контракт query-параметров запроса GET /items
 *
 * Все поля необязательные — сервер применяет значения по умолчанию,
 * если параметр не передан.
 *
 * @example
 * GET /items?q=iPhone&limit=10&skip=0&needsRevision=true&categories=electronics,auto&sortColumn=createdAt&sortDirection=desc
 */
export type GetItemsQuery = {
  /** Строка поиска по названию объявления */
  q?: string;

  /** Максимальное число объявлений в ответе (для пагинации) */
  limit?: number;

  /** Количество пропускаемых объявлений (для пагинации) */
  skip?: number;

  /**
   * Фильтр по статусу доработки.
   * Передаётся только значение `true` — иного варианта API не принимает.
   */
  needsRevision?: true;

  /**
   * Фильтр по категориям.
   * Несколько значений разделяются запятой (серверное ожидание — строка).
   * @example 'auto,electronics'
   */
  categories?: string;

  /** Поле, по которому производится сортировка */
  sortColumn?: GetItemsSortColumn;

  /** Порядок сортировки */
  sortDirection?: GetItemsSortDirection;
};

/**
 * Один элемент в списке объявлений.
 * Сервер возвращает только поля, необходимые для отображения карточки в списке.
 */
export type GetItemsResponseItem = {
  id: string;
  category: ItemCategories;
  title: string;
  price: number;
  /** Вычисляется на сервере: true, если не заполнены description или любые params */
  needsRevision: boolean;
};

/**
 * Контракт ответа GET /items
 */
export type GetItemsResponse = {
  items: GetItemsResponseItem[];
  /** Общее число записей, соответствующих условиям фильтрации (без учёта limit/skip) */
  total: number;
};
