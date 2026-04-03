import { AdsView } from '@/features/ads-view';
import { useAppSelector } from '@/app/hooks';
import { Typography } from '@/shared/ui';

export const AdsListPage = () => {
  const count = useAppSelector((state) => state.adsView.total);

  return (
    <div className="flex flex-col gap-1 p-8">
      <Typography
        variant="title-large"
        className="px-2 text-[var(--text-title)]"
      >
        Мои объявления
      </Typography>
      <Typography
        variant="page-subtitle"
        className="px-2 text-[var(--text-secondary)]"
      >
        {count} объявлений
      </Typography>
      <div className="mt-3">
        <AdsView />
      </div>
    </div>
  );
};
