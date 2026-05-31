import { useState } from "react";
import { Plus } from "lucide-react";
import { useTransactions } from "../hooks/useTransactions";
import { useTransactionMutations } from "../hooks/useTransactionMutations";
import TransactionFilters, { type FilterValues } from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import Pagination from "../components/transactions/Pagination";
import TransactionFormModal from "../components/transactions/TransactionFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import type { Transaction } from "../services/transactionService";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function TransactionsPage() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | undefined>(undefined);
  const [deleting, setDeleting] = useState<Transaction | undefined>(undefined);

  const query = useTransactions({ ...filters, page, size: PAGE_SIZE });
  const { remove } = useTransactionMutations();

  function handleFilterChange(next: FilterValues) {
    setFilters(next);
    setPage(0);
  }

  function openCreate() {
    setEditing(undefined);
    setModalOpen(true);
  }
  function openEdit(t: Transaction) {
    setEditing(t);
    setModalOpen(true);
  }
  function confirmDelete() {
    if (!deleting) return;
    remove.mutate(deleting.id, {
      onSuccess: () => {
        toast.success("Transação excluída");
        setDeleting(undefined);
      },
      onError: () => toast.error("Erro ao excluir"),
    });
  }

  return (
    <div className="max-w-[980px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-h2 text-ink-900">Extrato</h2>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-pine-700 text-white hover:bg-pine-800 rounded-sm px-4 py-2.5 text-sm font-semibold shadow-pine transition-colors active:scale-[0.975]"
        >
          <Plus size={17} /> Nova transação
        </button>
      </div>

      <TransactionFilters value={filters} onChange={handleFilterChange} />

      <div className="bg-surface rounded-md shadow-card overflow-hidden">
        {query.isLoading ? (
          <p className="text-ink-500 p-6">Carregando...</p>
        ) : query.isError ? (
          <p className="text-expense p-6">Erro ao carregar transações.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <TransactionTable rows={query.data!.content} onEdit={openEdit} onDelete={setDeleting} />
            </div>
            <Pagination
              page={page}
              totalPages={query.data!.totalPages}
              isLast={query.data!.last}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {modalOpen && (
        <TransactionFormModal transaction={editing} onClose={() => setModalOpen(false)} />
      )}
      {deleting && (
        <ConfirmDialog
          message={`Excluir "${deleting.description}"? Essa ação não pode ser desfeita.`}
          loading={remove.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(undefined)}
        />
      )}
    </div>
  );
}