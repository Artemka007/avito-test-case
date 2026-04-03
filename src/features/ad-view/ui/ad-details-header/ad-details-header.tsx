import type { GetItemResponse } from '../../api/contracts';
import { Button, Typography } from '@/shared/ui';
import { PenIcon } from '@/shared/ui';

import { formatDate, formatPrice } from './helpers';

type AdDetailsHeaderProps = {
  item: GetItemResponse;
  onEdit: () => void;
};

export const AdDetailsHeader = ({ item, onEdit }: AdDetailsHeaderProps) => (
  <div className="flex items-start justify-between">
    <div className="flex flex-col gap-3">
      <Typography variant="title-h2">{item.title}</Typography>
      <Button onClick={onEdit}>
        Редактировать <PenIcon />
      </Button>
    </div>

    <div className="flex flex-col items-end gap-1">
      <Typography variant="title-h2">{formatPrice(item.price)}</Typography>
      <span className="font-body-regular text-[var(--text-secondary)]">
        Опубликовано: {formatDate(item.createdAt)}
      </span>
      <span className="font-body-regular text-[var(--text-secondary)]">
        Обновлено: {formatDate(item.updatedAt)}
      </span>
    </div>
  </div>
);
