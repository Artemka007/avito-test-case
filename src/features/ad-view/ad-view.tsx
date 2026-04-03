import { useNavigate } from 'react-router-dom';

import { ImagePlaceholder } from '@/features/ads-view/ui/ad-card/image-placeholder';

import { useAdItem } from './hooks';
import { getMissingFields } from './helpers';
import { AdCharacteristics, AdDetailsHeader, NeedsRevisionAlert } from './ui';

type AdViewProps = {
  id: string | undefined;
};

export const AdView = ({ id }: AdViewProps) => {
  const navigate = useNavigate();
  const { item, loading, error } = useAdItem(id);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-body-regular text-[var(--text-muted)]">
          Загрузка…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-body-regular text-[var(--warning-text)]">
          {error}
        </span>
      </div>
    );
  }

  if (!item) return null;

  const missingFields = getMissingFields(item);

  return (
    <div className="flex h-full flex-col overflow-hidden p-8">
      <AdDetailsHeader
        item={item}
        onEdit={() => navigate(`/ads/${item.id}/edit`)}
      />

      <hr className="my-8 border-[var(--border)]" />

      <div className="flex min-h-0 flex-1 gap-8">
        {/* Left column — image + description */}
        <div className="flex w-[480px] shrink-0 flex-col gap-6 overflow-y-auto">
          <ImagePlaceholder variant="grid" />

          {item.description && (
            <div className="flex flex-col gap-2">
              <p className="font-title-large text-[var(--char-title)]">
                Описание
              </p>
              <p className="font-[Inter] text-[16px] leading-[140%] font-normal text-[var(--char-title)]">
                {item.description}
              </p>
            </div>
          )}
        </div>

        {/* Right column — alert + characteristics */}
        <div className="flex flex-1 flex-col gap-9 overflow-y-auto">
          <NeedsRevisionAlert missingFields={missingFields} />
          <AdCharacteristics item={item} />
        </div>
      </div>
    </div>
  );
};
