import { AdCard } from '@/features/ads-view/ui';
import { ItemCategories } from '@/features/ads-view/store/enums';

const mockItem = {
  id: '1',
  title: 'iPhone 15 Pro Max 256GB, Titanium',
  category: ItemCategories.Electronics,
  price: 119990,
  needsRevision: true,
};

export function AdsListPage() {
  return (
    <div className="p-6">
      <div className="max-w-xs">
        <AdCard item={mockItem} variant="grid" />
        <AdCard item={mockItem} variant="list" />
      </div>
    </div>
  );
}
