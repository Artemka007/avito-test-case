import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export type PageButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function PageButton({
  active,
  className,
  children,
  ...props
}: PageButtonProps) {
  return (
    <button
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg border bg-white transition-colors select-none',
        active
          ? 'border-[#1890FF] text-[#1890FF]'
          : 'border-[#D9D9D9] text-[var(--char-title)]',
        !props.disabled &&
          !active &&
          'hover:border-[#1890FF] hover:text-[#1890FF]',
        props.disabled && 'cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
