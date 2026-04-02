/**
 * Параметры объявления категории «Авто»
 */
export type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

/**
 * Параметры объявления категории «Недвижимость»
 */
export type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

/**
 * Параметры объявления категории «Электроника»
 */
export type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

/**
 * Дискриминированный union всех возможных param-наборов
 */
export type ItemParams =
  | AutoItemParams
  | RealEstateItemParams
  | ElectronicsItemParams;
