import { Button } from '@/shared/ui';

type AiTooltipProps = {
  result: string | null;
  error: string | null;
  onApply: () => void;
  onClose: () => void;
};

const triangleBorderStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: -9,
  left: 24,
  width: 0,
  height: 0,
  borderLeft: '7px solid transparent',
  borderRight: '7px solid transparent',
};

export const AiTooltip = ({
  result,
  error,
  onApply,
  onClose,
}: AiTooltipProps) => {
  if (error) {
    return (
      <div className="absolute bottom-full left-0 z-20 mb-3 w-[332px] rounded border border-[#FFCCC7] bg-[#FFF1F0] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <p className="font-body-sm-strong mb-1 text-[#CF1322]">
          Ошибка запроса к AI
        </p>
        <p className="font-body-sm mb-3 text-[#CF1322] opacity-80">
          Попробуйте повторить запрос или закройте уведомление.
        </p>
        <Button type="button" variant="gray" onClick={onClose}>
          Закрыть
        </Button>
        {/* Downward triangle arrow */}
        <div
          style={{ ...triangleBorderStyle, borderTop: '9px solid #FFCCC7' }}
        />
        <div
          style={{
            ...triangleBorderStyle,
            bottom: -8,
            borderTop: '8px solid #FFF1F0',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute bottom-full left-0 z-20 mb-3 w-[332px] rounded border border-[var(--border)] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
      <p className="font-body-sm-strong mb-1 text-[var(--text-primary)]">
        Ответ AI:
      </p>
      <p className="font-body-sm mb-3 line-clamp-6 whitespace-pre-wrap text-[var(--text-primary)]">
        {result}
      </p>
      <div className="flex gap-2">
        <Button type="button" onClick={onApply}>
          Применить
        </Button>
        <Button type="button" variant="gray" onClick={onClose}>
          Закрыть
        </Button>
      </div>
      {/* Downward triangle arrow */}
      <div
        style={{ ...triangleBorderStyle, borderTop: '9px solid var(--border)' }}
      />
      <div
        style={{
          ...triangleBorderStyle,
          bottom: -8,
          borderTop: '8px solid white',
        }}
      />
    </div>
  );
};
