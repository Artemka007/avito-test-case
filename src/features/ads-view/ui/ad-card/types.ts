import type { ComponentPropsWithoutRef } from 'react';

import type { GetItemsResponseItem } from '../../api/contracts';

export type AdCardVariant = 'grid' | 'list';

export type AdCardOwnProps = {
  item: GetItemsResponseItem;
  variant?: AdCardVariant;
};

export type AdCardProps = AdCardOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, keyof AdCardOwnProps>;
