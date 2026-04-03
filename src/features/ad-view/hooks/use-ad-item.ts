import { useEffect, useReducer } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchReducer, initialFetchState } from '@/shared/lib/fetch-reducer';

import { getItem } from '../api';
import { setItem, setLoading, setError, reset } from '../store';
import { selectAdViewItem } from '../store/selectors';
import type { GetItemResponse } from '../api/contracts';

type UseAdItemResult = {
  item: GetItemResponse | null;
  loading: boolean;
  error: string | null;
};

export const useAdItem = (id: string | undefined): UseAdItemResult => {
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectAdViewItem);

  const [{ loading, error }, fetchDispatch] = useReducer(
    fetchReducer,
    initialFetchState,
  );

  useEffect(() => {
    if (!id) return;

    dispatch(reset());
    fetchDispatch({ type: 'fetch' });
    dispatch(setLoading(true));

    const controller = new AbortController();
    let cancelled = false;

    getItem(id, controller.signal)
      .then((data) => {
        if (cancelled) return;
        dispatch(setItem(data));
        fetchDispatch({ type: 'success' });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof Error && err.name === 'CanceledError') return;
        const message =
          err instanceof Error
            ? err.message
            : 'Не удалось загрузить объявление';
        dispatch(setError(message));
        fetchDispatch({ type: 'error', message });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id, dispatch]);

  return { item, loading, error };
};
