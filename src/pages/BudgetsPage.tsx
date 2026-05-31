import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useBudgetStatus, useBudgetMutations } from "../hooks/useBudgets";
import BudgetCard from "../components/budgets/BudgetCard";
import BudgetFormModal from "../components/budgets/BudgetFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import type { BudgetStatus } from "../services/budgetService";

const YEAR = 2026;
const MONTH = 5;

export default function BudgetsPage() {
  const query = useBudgetStatus(YEAR, MONTH);
  const { remove } = useBudgetMutations();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BudgetStatus | undefined>();
  const [deleting, setDeleting] = useState<BudgetStatus | undefined>();

  function openCreate() { setEditing(undefined); setModalOpen(true); }
  function openEdit(b: BudgetStatus) { setEditing(b); setModalOpen(true); }
  function confirmDelete() {
    if (!deleting) return;
    remove.mutate(deleting.budgetId, {
      onSuccess: () => { toast.success("Orçamento excluído"); setDeleting(undefined); },
      onError: () => toast.error("Erro ao excluir"),
    });
  }

  return (
    <div className="max-w-[980px] mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-display font-bold text-h2 text-ink-900">Orçamentos</h2>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-pine-700 text-white hover:bg-pine-800 rounded-sm px-4 py-2.5 text-sm font-semibold shadow-pine transition-colors active:scale-[0.975]">
          <Plus size={17} /> Novo orçamento
        </button>
      </div>

      {query.isLoading ? (
        <p className="text-ink-500">Carregando...</p>
      ) : query.isError ? (
        <p className="text-expense">Erro ao carregar orçamentos.</p>
      ) : query.data!.length === 0 ? (
        <p className="text-ink-500">Nenhum orçamento definido para este mês.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {query.data!.map((b: BudgetStatus) => (
            <BudgetCard key={b.budgetId} budget={b} onEdit={openEdit} onDelete={setDeleting} />
          ))}
        </div>
      )}

      {modalOpen && (
        <BudgetFormModal budget={editing} year={YEAR} month={MONTH} onClose={() => setModalOpen(false)} />
      )}
      {deleting && (
        <ConfirmDialog
          message={`Excluir o orçamento de "${deleting.categoryName}"?`}
          loading={remove.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(undefined)}
        />
      )}
    </div>
  );
}