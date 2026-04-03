import type { ItemCategories } from '../enums';

export type Filter = {
  categories: Record<ItemCategories, boolean>;
  needsRevision: boolean;
};
