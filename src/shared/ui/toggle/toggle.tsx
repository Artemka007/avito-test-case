import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn';

type ToggleOwnProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

type ToggleProps = ToggleOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ToggleOwnProps | 'onClick'>;

export function Toggle({
  checked = false,
  onCheckedChange,
  className,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative inline-flex h-[22px] w-11 shrink-0 cursor-pointer rounded-[1rem]',
        'gap-1 pt-[2px] pr-6 pb-[2px] pl-[2px] transition-colors duration-200',
        checked ? 'bg-[var(--toggle-bg-on)]' : 'bg-[var(--toggle-bg-off)]',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'absolute top-[2px] left-[2px] h-[18px] w-[18px] rounded-[4.8125rem] bg-white transition-transform duration-200',
          'shadow-[0px_2px_4px_0px_#00230B33]',
          checked ? 'translate-x-[22px]' : 'translate-x-0',
        )}
      />
    </button>
  );
}
