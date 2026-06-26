import { useState } from "react";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useTransfers } from "../hooks/useTransfers";
import { useTransferMutations } from "../hooks/useTransferMutations";
import TransferFormModal from "../components/transfers/TransferFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { formatBRL } from "../lib/format";
import type { Transfer } from "../services/transferService";

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR");
}

export default function TransfersPage() {
  const { data, isLoading, isError } = useTransfers();
  const { remove } = useTransferMutations();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState<Transfer | undefined>();

  function confirmDelete() {
    if (!deleting) return;
    remove.mutate(deleting.id, {
      onSuccess: () => { toast.success("Transferência excluída"); setDeleting(undefined); },
      onError: () => toast.error("Erro ao excluir"),
    });
  }

  const transfers = data ?? [];

  return (
    <div className="max-w-[760px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-h2 text-ink-900">Transferências</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-pine-700 text-white hover:bg-pine-800 rounded-sm px-4 py-2.5 text-sm font-semibold shadow-pine transition-colors active:scale-[0.975]"
        >
          <Plus size={17} /> Nova transferência
        </button>
      </div>

      <div className="bg-surface rounded-md shadow-card overflow-hidden">
        {isLoading ? (
          <p className="text-ink-500 p-6">Carregando...</p>
        ) : isError ? (
          <p className="text-expense p-6">Erro ao carregar.</p>
        ) : transfers.length === 0 ? (
          <p className="text-ink-500 p-6">Nenhuma transferência registrada.</p>
        ) : (
          transfers.map((t, i) => (
            <div key={t.id} className={`flex items-center justify-between px-5 py-4 ${i ? "border-t border-line" : ""}`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-semibold text-ink-900 text-sm truncate">{t.description}</span>
                  <span className="flex items-center gap-1.5 text-ink-400 text-[12.5px]">
                    {t.fromAccountName}
                    <ArrowRight size={12} />
                    {t.toAccountName}
                  </span>
                  <span className="text-ink-400 text-[12px]">{formatDate(t.date)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono font-bold text-[15px] tabular-nums text-ink-900">
                  {formatBRL(t.amount)}
                </span>
                <button
                  onClick={() => setDeleting(t)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-expense-soft hover:text-expense transition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && <TransferFormModal onClose={() => setModalOpen(false)} />}
      {deleting && (
        <ConfirmDialog
          message={`Excluir a transferência "${deleting.description}"?`}
          loading={remove.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(undefined)}
        />
      )}
    </div>
  );
}
