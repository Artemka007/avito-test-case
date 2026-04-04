import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  Checkbox,
  Chevron,
  ControlButton,
  Toggle,
  Typography,
} from '@/shared/ui';
import {
  resetFilter,
  toggleFilterCategory,
  toggleNeedsRevision,
} from '@/features/ads-view/store';
import { ItemCategories } from '@/features/ads-view/store/enums';
import { CATEGORY_LABEL } from '../ad-card/helpers';

const CATEGORIES = [
  ItemCategories.Auto,
  ItemCategories.Electronics,
  ItemCategories.RealEstate,
] as const;

export function AdsFilter() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.adsView.filter);
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  return (
    <div className="flex flex-col gap-[calc(1rem*10/16)]">
      {/* Main filter card */}
      <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-strong)]">
        {/* Category section header */}
        <Typography
          variant="h5-medium"
          className="flex w-full cursor-pointer items-center justify-between p-4 pb-[calc(1rem*10/16)]"
        >
          Фильтры
        </Typography>
        <button
          type="button"
          onClick={() => setCategoriesOpen((prev) => !prev)}
          className="mb-2 flex h-[22px] w-full cursor-pointer items-center justify-between px-4"
        >
          <Typography variant="body-regular">Категория</Typography>
          <Chevron open={categoriesOpen} />
        </button>

        {/* Category checkboxes */}
        {categoriesOpen && (
          <div className="flex flex-col gap-2 pb-3">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-2 px-4"
              >
                <Checkbox
                  checked={filter.categories[cat]}
                  onCheckedChange={() => dispatch(toggleFilterCategory(cat))}
                />
                <Typography variant="body">{CATEGORY_LABEL[cat]}</Typography>
              </label>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="mx-4 h-px bg-[#F0F0F0]" />

        {/* Needs revision toggle */}
        <div className="flex items-center justify-between px-4 py-3">
          <Typography variant="body-sm-strong">
            Только требующие доработок
          </Typography>
          <Toggle
            checked={filter.needsRevision}
            onCheckedChange={() => dispatch(toggleNeedsRevision())}
          />
        </div>
      </div>

      <ControlButton onClick={() => dispatch(resetFilter())}>
        Сбросить
      </ControlButton>
    </div>
  );
}
