import { cn } from '@/shared/lib/cn';

import { ErrorCircleIcon } from '../icons/error-circle-icon';
import { SuccessIcon } from '../icons/success-icon';

export type AlertVariant = 'success' | 'error';

export type AlertProps = {
  variant: AlertVariant;
  title: string;
  description?: string;
  className?: string;
};

export const Alert = ({
  variant,
  title,
  description,
  className,
}: AlertProps) => {
  const isSuccess = variant === 'success';

  return (
    <div
      className={cn(
        'flex rounded-sm border',
        isSuccess
          ? 'items-center border-[#B7EB8F] bg-[#F6FFED] px-4 py-[11px]'
          : 'items-start border-[#FFCCC7] bg-[#FFF1F0] px-4 pt-[11px] pb-4',
        className,
      )}
    >
      <span className="flex-shrink-0">
        {isSuccess ? <SuccessIcon /> : <ErrorCircleIcon />}
      </span>
      <div className={cn('ml-2', !isSuccess && 'flex flex-col gap-2')}>
        <span className="font-body-regular">{title}</span>
        {description && (
          <p className="font-body-sm text-[var(--text-primary)]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
