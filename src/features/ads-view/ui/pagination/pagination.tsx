import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { cn } from '@/shared/lib/cn';
import { Chevron } from '@/shared/ui';
import { setPage } from '../../store';
import { PageButton } from './page-button';

const WINDOW_SIZE = 5;

function getPageWindow(current: number, total: number): number[] {
  let start = Math.max(1, current - Math.floor(WINDOW_SIZE / 2));
  let end = start + WINDOW_SIZE - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - WINDOW_SIZE + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ totalPages }: { totalPages: number }) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.adsView.currentPage);

  if (totalPages <= 1) return null;

  const pages = getPageWindow(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex items-center gap-2">
      <PageButton
        disabled={isFirst}
        onClick={() => dispatch(setPage(currentPage - 1))}
        aria-label="Предыдущая страница"
      >
        <Chevron
          className={cn(
            'rotate-[270deg]',
            isFirst ? 'text-[#D9D9D9]' : 'text-[var(--char-title)]',
          )}
        />
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => dispatch(setPage(page))}
          aria-current={page === currentPage ? 'page' : undefined}
          className="font-body-regular"
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        disabled={isLast}
        onClick={() => dispatch(setPage(currentPage + 1))}
        aria-label="Следующая страница"
      >
        <Chevron
          className={cn(
            'rotate-90',
            isLast ? 'text-[#D9D9D9]' : 'text-[var(--char-title)]',
          )}
        />
      </PageButton>
    </div>
  );
}
