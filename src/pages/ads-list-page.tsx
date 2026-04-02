import { AdCard, AdSearch, AdsFilter } from '@/features/ads-view/ui';
import { ItemCategories } from '@/features/ads-view/store/enums';

const mockItem = {
  id: '1',
  title: 'iPhone 15 Pro Max 256GB, Titanium',
  category: ItemCategories.Electronics,
  price: 119990,
  needsRevision: true,
};

export const AdsListPage = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <AdSearch />
      <div className="flex gap-6">
        <aside className="w-64 shrink-0">
          <AdsFilter />
        </aside>
        <div className="flex max-w-xs flex-col gap-4">
          <AdCard item={mockItem} variant="grid" />
          <AdCard item={mockItem} variant="list" />
        </div>
      </div>
    </div>
  );
};
