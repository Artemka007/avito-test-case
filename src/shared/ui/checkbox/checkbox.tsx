import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

type CheckboxOwnProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

type CheckboxProps = CheckboxOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CheckboxOwnProps | 'onClick'>;

export function Checkbox({
  checked = false,
  onCheckedChange,
  className,
  ...props
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn('h-4 w-4 shrink-0 cursor-pointer', className)}
      {...props}
    >
      {checked ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="16" rx="0.125rem" fill="#1890FF" />
          <path
            d="M7.10533 12.6041L7.08771 12.6217L2.68787 8.22185L4.12054 6.78917L7.10539 9.77402L11.8794 5L13.3121 6.43268L7.12301 12.6218L7.10533 12.6041Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="0.09375rem"
            fill="white"
            stroke="#D9D9D9"
          />
        </svg>
      )}
    </button>
  );
}
