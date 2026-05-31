import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionFilters, { type FilterValues } from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import Pagination from "../components/transactions/Pagination";

const PAGE_SIZE = 10;

export default function TransactionsPage() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [page, setPage] = useState(0);

  const query = useTransactions({ ...filters, page, size: PAGE_SIZE });

  function handleFilterChange(next: FilterValues) {
    setFilters(next);
    setPage(0); // muda filtro → volta pra primeira página
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Extrato</h2>

      <TransactionFilters value={filters} onChange={handleFilterChange} />

      <div className="bg-surface rounded-lg shadow-card overflow-hidden">
        {query.isLoading ? (
          <p className="text-text-secondary p-6">Carregando...</p>
        ) : query.isError ? (
          <p className="text-expense p-6">Erro ao carregar transações.</p>
        ) : (
          <>
            <TransactionTable rows={query.data!.content} />
            <Pagination
              page={page}
              totalPages={query.data!.totalPages}
              isLast={query.data!.last}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}