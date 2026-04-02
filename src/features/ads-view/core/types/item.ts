import type { ItemCategories } from '../enums';

export type Item = {
  category: ItemCategories;
  title: string;
  price: number;
  needsRevision: boolean;
};
