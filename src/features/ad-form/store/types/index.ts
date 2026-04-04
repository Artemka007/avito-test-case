import type { ItemCategories } from '@/features/ads-view/store/enums';
import type {
  AutoItemParams,
  ElectronicsItemParams,
  RealEstateItemParams,
} from '@/shared/api/contracts';

export type AdFormFields = {
  category: ItemCategories;
  title: string;
  price: number | '';
  description: string;
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
};

/** Серверные поля, не редактируются */
export type AdFormMeta = {
  id: string;
  createdAt: string;
  updatedAt: string;
  needsRevision: boolean;
};

export type AdFormState = {
  fields: AdFormFields | null;
  meta: AdFormMeta | null;
  saving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
};
