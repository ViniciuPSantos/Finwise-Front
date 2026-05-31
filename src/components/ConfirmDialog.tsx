type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function ConfirmDialog({ message, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 bg-[rgba(10,20,16,0.5)] flex items-center justify-center p-5 z-50" onClick={onCancel}>
      <div className="bg-surface rounded-lg shadow-pop p-6 w-full max-w-[400px]" onClick={(e) => e.stopPropagation()}>
        <p className="mb-6 text-ink-700">{message}</p>
        <div className="flex gap-2.5 justify-end">
          <button onClick={onCancel} className="px-4 py-2.5 rounded-sm text-sm font-semibold text-ink-500 hover:bg-paper-sunk hover:text-ink-900 transition">Cancelar</button>
          <button onClick={onConfirm} disabled={loading} className="inline-flex items-center px-4 py-2.5 rounded-sm text-sm font-semibold bg-expense text-white hover:opacity-90 disabled:opacity-45 transition active:scale-[0.975]">
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}