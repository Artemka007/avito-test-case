import { WarningIcon } from '@/shared/ui';

type NeedsRevisionAlertProps = {
  missingFields: string[];
};

export const NeedsRevisionAlert = ({
  missingFields,
}: NeedsRevisionAlertProps) => {
  if (!missingFields.length) return null;

  return (
    <div className="rounded-sm bg-[var(--warning-bg)] px-4 py-3 shadow-sm">
      <p className="flex items-center gap-1.5 font-[Roboto] text-[16px] leading-[24px] font-semibold text-[var(--warning-text)]">
        <WarningIcon />
        Требуются доработки
      </p>
      <p className="mt-1 font-[Roboto] text-[14px] leading-[22px] font-normal text-[var(--char-title)]">
        У объявления не заполнены поля:
      </p>
      <ul className="mt-0.5 list-disc pl-5">
        {missingFields.map((field) => (
          <li
            key={field}
            className="font-[Roboto] text-[14px] leading-[22px] font-normal text-[var(--char-title)]"
          >
            {field}
          </li>
        ))}
      </ul>
    </div>
  );
};
