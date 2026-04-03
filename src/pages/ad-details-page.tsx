import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  AdCharacteristics,
  AdDetailsHeader,
  NeedsRevisionAlert,
  getItem,
} from '@/features/ad-view';
import { ImagePlaceholder } from '@/features/ads-view/ui/ad-card/image-placeholder';
import type { GetItemResponse } from '@/features/ad-view';

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; item: GetItemResponse };

type Action =
  | { type: 'fetch' }
  | { type: 'success'; item: GetItemResponse }
  | { type: 'error'; message: string };

const reducer = (_: State, action: Action): State => {
  if (action.type === 'fetch') return { status: 'loading' };
  if (action.type === 'success')
    return { status: 'success', item: action.item };
  return { status: 'error', message: action.message };
};

const getMissingFields = (item: GetItemResponse): string[] => {
  const missing: string[] = [];
  if (!item.description) missing.push('Описание');

  const params = item.params as Record<string, unknown>;
  const filled = Object.values(params).filter(
    (v) => v !== undefined && v !== null && v !== '',
  );
  if (!filled.length) missing.push('Характеристики');

  return missing;
};

export const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    dispatch({ type: 'fetch' });

    getItem(id, controller.signal).then(
      (item) => dispatch({ type: 'success', item }),
      (err: unknown) => {
        if (err instanceof Error && err.name === 'CanceledError') return;
        const message =
          err instanceof Error ? err.message : 'Неизвестная ошибка';
        dispatch({ type: 'error', message });
      },
    );

    return () => controller.abort();
  }, [id]);

  if (state.status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="font-body-regular text-[var(--text-muted)]">
          Загрузка…
        </span>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="font-body-regular text-[var(--warning-text)]">
          {state.message}
        </span>
      </div>
    );
  }

  const { item } = state;
  const missingFields = getMissingFields(item);

  return (
    <div className="flex h-screen flex-col overflow-hidden p-8">
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
