import { useEffect, useRef, useState } from 'react';

import { Chevron } from '@/shared/ui/icons';
import { SortOptions } from '@/features/ads-view/store/enums';

const SORT_LABELS: Record<SortOptions, string> = {
  [SortOptions.PriceAsc]: 'По цене (сначала дешевле)',
  [SortOptions.PriceDesc]: 'По цене (сначала дороже)',
  [SortOptions.DateAsc]: 'По новизне (сначала старые)',
  [SortOptions.DateDesc]: 'По новизне (сначала новые)',
  [SortOptions.TitleAsc]: 'По названию (А → Я)',
  [SortOptions.TitleDesc]: 'По названию (Я → А)',
};

type SortDropdownProps = {
  value: SortOptions;
  onChange: (sort: SortOptions) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="font-body-regular flex h-8 w-[300px] cursor-pointer items-center justify-between gap-2 rounded-sm border-4 border-[#F4F4F6] bg-white px-3 text-[var(--text-primary)] transition-colors"
      >
        <span className="whitespace-nowrap">{SORT_LABELS[value]}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] right-0 z-20 min-w-full overflow-hidden rounded-sm border border-[var(--border)] bg-white shadow-md">
          {(Object.entries(SORT_LABELS) as [SortOptions, string][]).map(
            ([opt, label]) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`font-body flex w-full items-center px-3 py-2 text-left whitespace-nowrap transition-colors hover:bg-[#F6F6F8] ${
                  value === opt
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-primary)]'
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
