type Props = {
  page: number;
  totalPages: number;
  isLast: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, isLast, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between p-4 text-sm">
      <span className="text-text-secondary">
        Página {page + 1} de {Math.max(totalPages, 1)}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="px-3 py-1 rounded-md bg-surface-elevated disabled:opacity-40"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={isLast}
          className="px-3 py-1 rounded-md bg-surface-elevated disabled:opacity-40"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}