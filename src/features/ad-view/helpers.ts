import type { GetItemResponse } from './api/contracts';

export const getMissingFields = (item: GetItemResponse): string[] => {
  const missing: string[] = [];

  if (!item.description) missing.push('Описание');

  const params = item.params as Record<string, unknown>;
  const filled = Object.values(params).filter(
    (v) => v !== undefined && v !== null && v !== '',
  );
  if (!filled.length) missing.push('Характеристики');

  return missing;
};
