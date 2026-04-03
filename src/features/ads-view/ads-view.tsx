import { useAdsItems } from './hooks';
import { AdCard, AdSearch, AdsFilter, Pagination } from './ui';

export const AdsView = () => {
  const { items, variant, totalPages, loading, error } = useAdsItems();

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4">
      <AdSearch />

      <div className="grid min-h-0 grid-cols-[16rem_1fr] gap-6">
        <aside className="self-start">
          <AdsFilter />
        </aside>

        <div className="grid h-full grid-rows-[1fr_auto] gap-4 overflow-y-auto">
          <div className="overflow-y-auto">
            {error && <p className="font-body-regular text-red-500">{error}</p>}

            {loading ? (
              <div className="font-body-regular flex items-center justify-center py-16 text-[var(--char-secondary)]">
                Загрузка…
              </div>
            ) : (
              <div
                className={
                  variant === 'grid'
                    ? 'grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4'
                    : 'flex flex-col gap-3'
                }
              >
                {items.map((item) => (
                  <AdCard key={item.id} item={item} variant={variant} />
                ))}
              </div>
            )}
          </div>

          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};
