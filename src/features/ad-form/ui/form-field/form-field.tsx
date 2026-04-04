import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
};

export const FormField = ({
  label,
  required,
  error,
  children,
  className,
}: FormFieldProps) => (
  <div className={cn('flex flex-col gap-1.5', className)}>
    <span className="font-label flex items-center gap-1 text-[var(--text-primary)]">
      {required && (
        <span className="leading-none text-red-500" aria-hidden="true">
          *
        </span>
      )}
      {label}
    </span>
    {children}
    {error && (
      <span className="font-body-sm text-red-500" role="alert">
        {error}
      </span>
    )}
  </div>
);
