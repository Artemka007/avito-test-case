import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  hasWarning?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ hasError, hasWarning, className, maxLength, ...props }, ref) => {
    const currentLength = String(props.value ?? '').length;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          maxLength={maxLength}
          className={cn(
            'font-body min-h-[120px] w-full resize-y rounded-sm border bg-white px-3 py-2 text-[var(--text-primary)] transition-[border-color,box-shadow] outline-none placeholder:text-[var(--text-placeholder)] focus:ring-1',
            maxLength != null && 'pb-7',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
              : hasWarning
                ? 'border-[var(--warning-text)] focus:border-[var(--warning-text)] focus:ring-[#faad1450]'
                : 'border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]',
            className,
          )}
          {...props}
        />
        {maxLength != null && (
          <span className="font-body-sm pointer-events-none absolute right-3 bottom-2 text-[var(--text-muted)]">
            {currentLength} / {maxLength}
          </span>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
