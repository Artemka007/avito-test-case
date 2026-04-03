import type { ElementType } from 'react';

import { cn } from '@/shared/lib/cn';

import type { TypographyProps, TypographyVariant } from './types';

const VARIANT_CLASS: Record<TypographyVariant, string> = {
  'title-large': 'font-title-large',
  'page-subtitle': 'font-page-subtitle',
  'body-regular': 'font-body-regular',
  'body-sm': 'font-body-sm',
  'body-sm-strong': 'font-body-sm-strong',
  'body-md-strong': 'font-body-md-strong',
  label: 'font-label',
  body: 'font-body',
  'body-strong': 'font-body-strong',
  h5: 'font-h5',
  'h5-medium': 'font-h5-medium',
};

const VARIANT_ELEMENT: Record<TypographyVariant, ElementType> = {
  'title-large': 'p',
  'page-subtitle': 'p',
  'body-regular': 'p',
  'body-sm': 'span',
  'body-sm-strong': 'span',
  'body-md-strong': 'p',
  label: 'span',
  body: 'p',
  'body-strong': 'p',
  h5: 'h5',
  'h5-medium': 'h5',
};

export function Typography({
  variant = 'body',
  as,
  className,
  ...props
}: TypographyProps) {
  const Tag = as ?? VARIANT_ELEMENT[variant];
  return <Tag className={cn(VARIANT_CLASS[variant], className)} {...props} />;
}
