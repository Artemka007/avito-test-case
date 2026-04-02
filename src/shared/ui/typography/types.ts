import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type TypographyVariant =
  | 'title-large'
  | 'body-regular'
  | 'body-sm'
  | 'body-sm-strong'
  | 'body-md-strong'
  | 'label'
  | 'body'
  | 'body-strong'
  | 'h5'
  | 'h5-medium';

type TypographyOwnProps = {
  variant?: TypographyVariant;
  as?: ElementType;
};

export type TypographyProps = TypographyOwnProps &
  Omit<ComponentPropsWithoutRef<'p'>, keyof TypographyOwnProps>;
