import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeView, search, sort } from '@/features/ads-view/store';
import { SearchInput } from './search-input';
import { SortDropdown } from './sort-dropdown';
import { ViewToggle } from './view-toggle';

export function AdSearch() {
  const dispatch = useAppDispatch();
  const { query, itemsView, sortOption } = useAppSelector(
    (state) => state.adsView,
  );

  return (
    <div className="flex h-14 items-center gap-5 rounded-sm border border-[var(--border)] bg-white px-3">
      <div className="flex-1">
        <SearchInput value={query} onChange={(v) => dispatch(search(v))} />
      </div>
      <ViewToggle value={itemsView} onChange={(v) => dispatch(changeView(v))} />
      <SortDropdown value={sortOption} onChange={(v) => dispatch(sort(v))} />
    </div>
  );
}
