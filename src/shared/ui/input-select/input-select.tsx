import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';
import { Chevron } from '../icons';

export type InputSelectOption = { value: string; label: string };

export type InputSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: InputSelectOption[];
  placeholder?: string;
  hasError?: boolean;
  hasWarning?: boolean;
};

export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  (
    { options, placeholder, hasError, hasWarning, className, ...props },
    ref,
  ) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'font-body h-9 w-full appearance-none rounded-sm border bg-white px-3 pr-8 text-[var(--text-primary)] transition-[border-color,box-shadow] outline-none focus:ring-1',
          !props.value && 'text-[var(--text-placeholder)]',
          hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
            : hasWarning
              ? 'border-[var(--warning-text)] focus:border-[var(--warning-text)] focus:ring-[#faad1450]'
              : 'border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]',
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <Chevron
        open={false}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
      />
    </div>
  ),
);

InputSelect.displayName = 'InputSelect';
