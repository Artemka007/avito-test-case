import { useEffect, useRef } from 'react';
import type { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import type { AdFormFields } from '../../store/types';

/** Internal form shape — price is stored as string to avoid NaN issues with type="number" */
export type FormValues = Omit<AdFormFields, 'price'> & { price: string };

export const useParamsField = (
  category: string,
  defaultCategory: string,
  watch: UseFormWatch<FormValues>,
  setValue: UseFormSetValue<FormValues>,
) => {
  const prevCategoryRef = useRef(defaultCategory);

  useEffect(() => {
    if (prevCategoryRef.current !== category) {
      prevCategoryRef.current = category;
      setValue('params', {} as AdFormFields['params']);
    }
  }, [category, setValue]);

  const params = (watch('params') ?? {}) as Record<string, unknown>;

  const handleParamChange = (
    field: string,
    value: string | number | undefined,
  ) => {
    const current = (watch('params') ?? {}) as Record<string, unknown>;
    const updated: Record<string, unknown> = { ...current };
    if (value === undefined) {
      delete updated[field];
    } else {
      updated[field] = value;
    }
    setValue('params', updated as AdFormFields['params']);
  };

  return { params, handleParamChange };
};
