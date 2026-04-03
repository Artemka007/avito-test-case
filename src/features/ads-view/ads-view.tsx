import { useAppSelector } from '@/app/hooks';
import { ItemCategories, ItemsView } from '@/features/ads-view/store/enums';
import { AdCard } from './ui/ad-card';
import { AdSearch } from './ui/ad-search';
import { AdsFilter } from './ui/ads-filter';
import { Pagination } from './ui/pagination';
import type { Item } from './store/types';

const mockItem = {
  id: '1',
  title: 'iPhone 15 Pro Max 256GB, Titanium',
  category: ItemCategories.Electronics,
  price: 119990,
  needsRevision: true,
};

const MOCK_ITEMS: (Item & { id: string })[] = Array.from(
  { length: 6 },
  (_, i) => ({ ...mockItem, id: String(i + 1) }),
);

export function AdsView() {
  const itemsView = useAppSelector((state) => state.adsView.itemsView);
  const currentPage = useAppSelector((state) => state.adsView.currentPage);
  const itemsPerPage = useAppSelector((state) => state.adsView.itemsPerPage);
  const variant = itemsView === ItemsView.Grid ? 'grid' : 'list';

  const totalPages = Math.max(1, Math.ceil(MOCK_ITEMS.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const visibleItems = MOCK_ITEMS.slice(start, start + itemsPerPage);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4">
      <AdSearch />

      <div className="grid grid-cols-[16rem_1fr] items-start gap-6">
        <aside>
          <AdsFilter />
        </aside>

        <div className="flex flex-col gap-4">
          <div
            className={
              variant === 'grid'
                ? 'grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4'
                : 'flex flex-col gap-3'
            }
          >
            {visibleItems.map((item) => (
              <AdCard key={item.id} item={item} variant={variant} />
            ))}
          </div>

          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
