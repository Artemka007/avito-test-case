import { GridViewIcon, ListViewIcon } from '@/shared/ui/icons';
import { ItemsView } from '@/features/ads-view/store/enums';

type ViewToggleProps = {
  value: ItemsView;
  onChange: (view: ItemsView) => void;
};

const BUTTONS: { view: ItemsView; Icon: typeof GridViewIcon }[] = [
  { view: ItemsView.Grid, Icon: GridViewIcon },
  { view: ItemsView.List, Icon: ListViewIcon },
];

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex h-8 w-[73px] shrink-0 rounded-sm bg-[#F4F4F6] p-0.5">
      {BUTTONS.map(({ view, Icon }, index) => {
        const active = value === view;
        return (
          <div key={view} className="flex flex-1 items-center">
            {index > 0 && <div className="h-4 w-px shrink-0 bg-white" />}
            <button
              type="button"
              aria-label={view === ItemsView.Grid ? 'Сетка' : 'Список'}
              onClick={() => onChange(view)}
              className={`flex flex-1 items-center justify-center rounded-sm transition-colors ${
                active
                  ? 'text-[var(--toggle-bg-on)]'
                  : 'text-[var(--char-secondary)] hover:text-[var(--char-title)]'
              }`}
            >
              <Icon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
