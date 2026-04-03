import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

import { ClearIcon } from '../icons';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void;
  hasError?: boolean;
  hasWarning?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ onClear, hasError, hasWarning, className, ...props }, ref) => {
    const showClear =
      !!onClear && !!props.value && String(props.value).length > 0;

    return (
      <div className="relative flex items-center">
        <input
          ref={ref}
          className={cn(
            'font-body h-9 w-full rounded-sm border bg-white px-3 text-[var(--text-primary)] transition-[border-color,box-shadow] outline-none placeholder:text-[var(--text-placeholder)] focus:ring-1',
            showClear && 'pr-8',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
              : hasWarning
                ? 'border-[var(--warning-text)] focus:border-[var(--warning-text)] focus:ring-[#faad1450]'
                : 'border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]',
            className,
          )}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            tabIndex={-1}
            className="absolute right-2.5 flex items-center justify-center text-black/40 transition-colors hover:text-black/70"
            aria-label="Очистить"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
