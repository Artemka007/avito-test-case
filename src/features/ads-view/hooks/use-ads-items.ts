import { useEffect, useMemo, useReducer } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchReducer, initialFetchState } from '@/shared/lib/fetch-reducer';
import { getItems } from '../api';
import { setItems, setTotal } from '../store';
import {
  selectCurrentPage,
  selectFilter,
  selectItems,
  selectItemsPerPage,
  selectItemsView,
  selectQuery,
  selectSortOption,
  selectTotal,
} from '../store/selectors';
import { ItemsView, SortOptions } from '../store/enums';
import type { GetItemsSortColumn, GetItemsSortDirection } from '../api';
import type { Item } from '../store/types';

type SortParams = {
  sortColumn?: GetItemsSortColumn;
  sortDirection?: GetItemsSortDirection;
};

const SORT_PARAMS: Record<SortOptions, SortParams> = {
  [SortOptions.TitleAsc]: { sortColumn: 'title', sortDirection: 'asc' },
  [SortOptions.TitleDesc]: { sortColumn: 'title', sortDirection: 'desc' },
  [SortOptions.DateAsc]: { sortColumn: 'createdAt', sortDirection: 'asc' },
  [SortOptions.DateDesc]: { sortColumn: 'createdAt', sortDirection: 'desc' },
  [SortOptions.PriceAsc]: {},
  [SortOptions.PriceDesc]: {},
};

type UseAdsItemsResult = {
  items: Item[];
  variant: 'grid' | 'list';
  totalPages: number;
  loading: boolean;
  error: string | null;
};

/**
 * Хук обеспечивающий агрегацию данных для отображения списка объявлений,
 * а также логику загрузки данных с сервера при изменении параметров отображения.
 * @returns Объект с данными для отображения списка объявлений,
 * включая состояние загрузки, ошибки и параметры пагинации.
 */
export const useAdsItems = (): UseAdsItemsResult => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const itemsPerPage = useAppSelector(selectItemsPerPage);
  const itemsView = useAppSelector(selectItemsView);
  const total = useAppSelector(selectTotal);
  const sortOption = useAppSelector(selectSortOption);
  const query = useAppSelector(selectQuery);
  const filter = useAppSelector(selectFilter);
  const items = useAppSelector(selectItems);

  const [{ loading, error }, fetchDispatch] = useReducer(
    fetchReducer,
    initialFetchState,
  );

  const variant = useMemo(
    () => (itemsView === ItemsView.Grid ? 'grid' : 'list') as 'grid' | 'list',
    [itemsView],
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / itemsPerPage)),
    [total, itemsPerPage],
  );

  useEffect(() => {
    let cancelled = false;
    fetchDispatch({ type: 'fetch' });

    const activeCategories = Object.entries(filter.categories)
      .filter(([, active]) => active)
      .map(([category]) => category);

    const controller = new AbortController();
    const signal = controller.signal;

    getItems(
      {
        q: query || undefined,
        limit: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
        ...(filter.needsRevision ? { needsRevision: true as const } : {}),
        ...(activeCategories.length
          ? { categories: activeCategories.join(',') }
          : {}),
        ...SORT_PARAMS[sortOption],
      },
      signal,
    )
      .then((res) => {
        if (cancelled) return;
        dispatch(setItems(res.items));
        dispatch(setTotal(res.total));
        fetchDispatch({ type: 'success' });
      })
      .catch(() => {
        if (cancelled) return;
        fetchDispatch({
          type: 'error',
          message: 'Не удалось загрузить объявления',
        });
      });

    return () => {
      // не применяем данные и закрываем запрос
      cancelled = true;
      controller.abort();
    };
  }, [dispatch, query, filter, sortOption, currentPage, itemsPerPage]);

  return { items, variant, totalPages, loading, error };
};
