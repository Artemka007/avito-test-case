import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export type ButtonVariant = 'primary' | 'yellow' | 'gray';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: ButtonVariant;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-[#1890FF] text-white hover:bg-[#096dd9]',
  yellow:
    'bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[#faad1440] hover:bg-[#faebd0]',
  gray: 'bg-[rgba(0,0,0,0.04)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[rgba(0,0,0,0.08)]',
};

export const Button = ({
  className,
  children,
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      'font-body-sm-strong inline-flex w-fit items-center gap-2 rounded-sm px-4 py-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50',
      VARIANT_CLASS[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
