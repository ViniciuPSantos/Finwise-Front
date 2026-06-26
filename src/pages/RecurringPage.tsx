import { useState } from "react";
import { Plus, Pencil, Trash2, RepeatIcon } from "lucide-react";
import { toast } from "sonner";
import { useRecurringTransactions } from "../hooks/useRecurringTransactions";
import { useRecurringTransactionMutations } from "../hooks/useRecurringTransactionMutations";
import RecurringFormModal from "../components/recurring/RecurringFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { formatBRL } from "../lib/format";
import type { RecurringTransaction } from "../services/recurringTransactionService";

const FREQUENCY_LABELS = {
  DAILY: "Diária",
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
};

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR");
}

export default function RecurringPage() {
  const { data, isLoading, isError } = useRecurringTransactions();
  const { remove } = useRecurringTransactionMutations();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<RecurringTransaction | undefined>();
  const [deleting, setDeleting] = useState<RecurringTransaction | undefined>();

  function confirmDelete() {
    if (!deleting) return;
    remove.mutate(deleting.id, {
      onSuccess: () => { toast.success("Recorrência excluída"); setDeleting(undefined); },
      onError: () => toast.error("Erro ao excluir"),
    });
  }

  const items = data ?? [];

  return (
    <div className="max-w-[760px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-h2 text-ink-900">Recorrentes</h2>
        <button
          onClick={() => { setEditing(undefined); setModalOpen(true); }}
          className="inline-flex items-center gap-2 bg-pine-700 text-white hover:bg-pine-800 rounded-sm px-4 py-2.5 text-sm font-semibold shadow-pine transition-colors active:scale-[0.975]"
        >
          <Plus size={17} /> Nova recorrência
        </button>
      </div>

      <div className="bg-surface rounded-md shadow-card overflow-hidden">
        {isLoading ? (
          <p className="text-ink-500 p-6">Carregando...</p>
        ) : isError ? (
          <p className="text-expense p-6">Erro ao carregar.</p>
        ) : items.length === 0 ? (
          <p className="text-ink-500 p-6">Nenhuma transação recorrente cadastrada.</p>
        ) : (
          items.map((r, i) => (
            <div key={r.id} className={`flex items-center justify-between px-5 py-4 ${i ? "border-t border-line" : ""}`}>
              <div className="flex items-center gap-3 min-w-0">
                <span className={`inline-flex items-center justify-center w-[38px] h-[38px] rounded-sm shrink-0 ${r.type === "INCOME" ? "bg-income/10" : "bg-expense/10"}`}>
                  <RepeatIcon size={18} className={r.type === "INCOME" ? "text-income" : "text-expense"} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink-900 text-sm truncate">{r.description}</span>
                    {!r.active && <span className="text-[11px] font-semibold text-ink-400 bg-paper-sunk px-1.5 py-0.5 rounded-xs">Inativa</span>}
                  </div>
                  <div className="text-ink-400 text-[12.5px]">
                    {FREQUENCY_LABELS[r.frequency]} · {r.accountName} · {r.categoryName}
                  </div>
                  <div className="text-ink-400 text-[12px]">Próxima: {formatDate(r.nextExecutionDate)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`font-mono font-bold text-[15px] tabular-nums ${r.type === "INCOME" ? "text-income" : "text-expense"}`}>
                  {r.type === "EXPENSE" ? "- " : "+ "}{formatBRL(r.amount)}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => { setEditing(r); setModalOpen(true); }}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 transition"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleting(r)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-expense-soft hover:text-expense transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && <RecurringFormModal recurring={editing} onClose={() => setModalOpen(false)} />}
      {deleting && (
        <ConfirmDialog
          message={`Excluir a recorrência "${deleting.description}"?`}
          loading={remove.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(undefined)}
        />
      )}
    </div>
  );
}
