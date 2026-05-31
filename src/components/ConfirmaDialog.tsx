type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function ConfirmDialog({ message, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onCancel}>
      <div className="bg-surface rounded-lg shadow-modal p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <p className="mb-6">{message}</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2 rounded-md bg-surface-elevated">Cancelar</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 py-2 rounded-md bg-expense disabled:opacity-50">
            {loading ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}