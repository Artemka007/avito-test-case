import { ItemCategories } from '../../store/enums';

export const CATEGORY_LABEL: Record<ItemCategories, string> = {
  [ItemCategories.Auto]: 'Авто',
  [ItemCategories.Electronics]: 'Электроника',
  [ItemCategories.RealEstate]: 'Недвижимость',
};

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}
