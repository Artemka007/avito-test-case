import type { ButtonHTMLAttributes } from 'react';

type ControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ControlButton({
  children,
  className,
  ...props
}: ControlButtonProps) {
  return (
    <button
      type="button"
      className={`font-body flex h-[41px] w-full cursor-pointer items-center justify-center rounded-sm border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
