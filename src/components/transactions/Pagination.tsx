import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  isLast: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, isLast, onPageChange }: Props) {
  const iconBtn =
    "inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 disabled:opacity-40 disabled:hover:bg-transparent transition";

  return (
    <div className="flex items-center justify-between p-3.5 border-t border-line text-sm">
      <span className="text-ink-500">
        Página {page + 1} de {Math.max(totalPages, 1)}
      </span>
      <div className="flex items-center gap-1.5">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 0} className={iconBtn}>
          <ChevronLeft size={16} />
        </button>
        <span className="px-2 text-ink-500">
          {page + 1} / {Math.max(totalPages, 1)}
        </span>
        <button onClick={() => onPageChange(page + 1)} disabled={isLast} className={iconBtn}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}