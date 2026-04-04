import type { ItemCategories } from '../enums';

export type Item = {
  id: string;
  category: ItemCategories;
  title: string;
  price: number;
  needsRevision: boolean;
};
