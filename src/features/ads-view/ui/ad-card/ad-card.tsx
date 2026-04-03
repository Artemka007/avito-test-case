import { Typography } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

import { CATEGORY_LABEL, formatPrice } from './helpers';
import { ImagePlaceholder } from './image-placeholder';
import type { AdCardProps } from './types';

export const AdCard: React.FC<AdCardProps> = ({
  item,
  variant = 'grid',
  className,
  ...divProps
}) => {
  const { title, price, category, needsRevision } = item;
  const categoryLabel = CATEGORY_LABEL[category];

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-strong)]',
        'cursor-pointer transition-shadow duration-200 hover:shadow-[0_4px_16px_-4px_rgba(15,23,42,0.12)]',
        variant === 'grid' && 'flex flex-col',
        variant === 'list' && 'flex w-full flex-row items-start gap-4 p-4',
        className,
      )}
      {...divProps}
    >
      <ImagePlaceholder variant={variant} />

      <div
        className={cn(
          'relative flex flex-col',
          variant === 'grid' && 'mt-2 gap-1 p-4',
          variant === 'list' && 'min-w-0 flex-1 gap-1',
        )}
      >
        {/* Category — Body/regular */}
        {variant === 'grid' ? (
          <Typography
            variant="body"
            as="span"
            className="absolute top-[-1.25rem] left-[0.75rem] self-start rounded-xs border border-[var(--border)] bg-[var(--surface-strong)] px-2 text-[var(--text-muted)]"
          >
            {categoryLabel}
          </Typography>
        ) : (
          <Typography
            variant="body"
            as="span"
            className="text-[var(--text-muted)]"
          >
            {categoryLabel}
          </Typography>
        )}

        {/* Title — H5/regular */}
        <Typography
          variant="h5"
          as="p"
          className="truncate text-[var(--char-title)]"
          title={title}
        >
          {title}
        </Typography>

        {/* Price — Body/strong */}
        <Typography
          variant="body-strong"
          className="text-[var(--char-secondary)]"
        >
          {formatPrice(price)}
        </Typography>

        {/* Needs revision badge — Body/regular */}
        {needsRevision && (
          <span className="mt-0.5 flex h-[26px] items-center gap-2 rounded-xs bg-[var(--warning-bg)] p-0.5 p-2">
            <span
              className="block h-[0.375rem] w-[0.375rem] shrink-0 rounded-full bg-[var(--warning-text)]"
              aria-hidden="true"
            />
            <Typography
              variant="body"
              as="span"
              className="text-[var(--warning-text)]"
            >
              Требует доработок
            </Typography>
          </span>
        )}
      </div>
    </div>
  );
};
