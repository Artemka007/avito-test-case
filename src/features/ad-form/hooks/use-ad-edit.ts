import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { ItemCategories } from '@/features/ads-view/store/enums';
import { useAdItem } from '@/features/ad-view/hooks';
import type { ItemParams } from '@/shared/api/contracts';

import { updateItem } from '../api';
import {
  reset,
  setFields,
  setSaveError,
  setSaveSuccess,
  setSaving,
} from '../store';
import {
  selectAdFormFields,
  selectAdFormSaveError,
  selectAdFormSaveSuccess,
  selectAdFormSaving,
} from '../store';
import type { AdFormFields } from '../store/types';

export const useAdEdit = (id: string | undefined) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { item, loading, error } = useAdItem(id);
  const fields = useAppSelector(selectAdFormFields);
  const saving = useAppSelector(selectAdFormSaving);
  const saveError = useAppSelector(selectAdFormSaveError);
  const saveSuccess = useAppSelector(selectAdFormSaveSuccess);

  /* Init form fields from the ad-view store whenever the item changes */
  useEffect(() => {
    if (!item) return;
    dispatch(
      setFields({
        fields: {
          category: item.category as ItemCategories,
          title: item.title,
          price: item.price,
          description: item.description ?? '',
          params: item.params as ItemParams,
        },
        meta: {
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          needsRevision: item.needsRevision,
        },
      }),
    );
    return () => {
      dispatch(reset());
    };
  }, [item, dispatch]);

  const handleSubmit = async (data: AdFormFields) => {
    if (!id) return;
    dispatch(setSaving(true));
    try {
      const response = await updateItem(id, {
        category: data.category,
        title: data.title,
        price: Number(data.price),
        description: data.description || undefined,
        params: data.params,
      });
      dispatch(
        setSaveSuccess({
          id: response.id,
          createdAt: response.createdAt,
          updatedAt: response.createdAt,
          needsRevision: response.needsRevision,
        }),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
      dispatch(setSaveError(message));
    } finally {
      dispatch(setSaving(false));
    }
  };

  const handleCancel = () => {
    if (id) navigate(`/ads/${id}`);
    else navigate('/ads');
  };

  return {
    fields,
    loading,
    error,
    saving,
    saveError,
    saveSuccess,
    handleSubmit,
    handleCancel,
  };
};
