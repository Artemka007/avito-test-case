import { SearchIcon } from '@/shared/ui/icons';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = 'Найти объявление...',
}: SearchInputProps) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-body-regular h-8 w-full rounded-sm bg-[#F6F6F8] pr-9 pl-3 text-[var(--text-primary)] transition-shadow outline-none placeholder:text-[var(--text-placeholder)] focus:ring-1 focus:ring-[var(--accent)]"
      />
      <SearchIcon className="pointer-events-none absolute right-3 text-[var(--char-title)]" />
    </div>
  );
}
