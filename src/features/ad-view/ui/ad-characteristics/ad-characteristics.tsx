import { Typography } from '@/shared/ui';
import type { GetItemResponse } from '../../api/contracts';

import { PARAM_LABELS } from './constants';
import { formatParamValue } from './helpers';

type AdCharacteristicsProps = {
  item: GetItemResponse;
};

export const AdCharacteristics = ({ item }: AdCharacteristicsProps) => {
  const entries = Object.entries(item.params).filter(
    ([, v]) => v !== undefined && v !== null && v !== '',
  );

  if (!entries.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="title-large">Характеристики</Typography>
      <dl className="flex flex-col gap-1">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-2">
            <dt className="font-body-sm shrink-0 text-[var(--char-secondary)]">
              {PARAM_LABELS[key] ?? key}:
            </dt>
            <dd className="font-body-sm text-[var(--char-title)]">
              {formatParamValue(key, value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
