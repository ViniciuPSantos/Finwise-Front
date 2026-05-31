import { useState } from "react";
import { Plus } from "lucide-react";
import { useTransactions } from "../hooks/useTransactions";
import { useTransactionMutations } from "../hooks/useTransactionMutations";
import TransactionFilters, { type FilterValues } from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import Pagination from "../components/transactions/Pagination";
import TransactionFormModal from "../components/transactions/TransactionFormModal";
import ConfirmDialog from "../components/ConfirmaDialog";
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Extrato</h2>
        <button onClick={openCreate} className="flex items-center gap-2 bg-primary rounded-md px-4 py-2 text-sm font-medium">
          <Plus size={16} /> Nova transação
        </button>
      </div>

      <TransactionFilters value={filters} onChange={handleFilterChange} />

      <div className="bg-surface rounded-lg shadow-card overflow-hidden">
        {query.isLoading ? (
          <p className="text-text-secondary p-6">Carregando...</p>
        ) : query.isError ? (
          <p className="text-expense p-6">Erro ao carregar transações.</p>
        ) : (
          <>
            <TransactionTable rows={query.data!.content} onEdit={openEdit} onDelete={setDeleting} />
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