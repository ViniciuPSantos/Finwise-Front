import { useAccounts, useCategories } from "../../hooks/useLookups";
import type { TransactionType } from "../../services/transactionService";

export type FilterValues = {
  accountId?: number;
  categoryId?: number;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
};

type Props = {
  value: FilterValues;
  onChange: (next: FilterValues) => void;
};

const inputClass =
  "rounded-sm px-3 py-2 text-sm bg-white text-ink-900 ring-1 ring-line-strong outline-none focus:ring-1.5 focus:ring-pine-600 transition";

export default function TransactionFilters({ value, onChange }: Props) {
  const accounts = useAccounts();
  const categories = useCategories();

  function update(patch: Partial<FilterValues>) {
    onChange({ ...value, ...patch });
  }

  return (
    <div className="bg-surface rounded-md shadow-card p-4 flex flex-wrap gap-3">
      <select
        className={inputClass}
        value={value.accountId ?? ""}
        onChange={(e) => update({ accountId: e.target.value ? Number(e.target.value) : undefined })}
      >
        <option value="">Todas as contas</option>
        {accounts.data?.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>

      <select
        className={inputClass}
        value={value.categoryId ?? ""}
        onChange={(e) => update({ categoryId: e.target.value ? Number(e.target.value) : undefined })}
      >
        <option value="">Todas as categorias</option>
        {categories.data?.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        className={inputClass}
        value={value.type ?? ""}
        onChange={(e) => update({ type: (e.target.value || undefined) as TransactionType | undefined })}
      >
        <option value="">Todos os tipos</option>
        <option value="INCOME">Receita</option>
        <option value="EXPENSE">Despesa</option>
      </select>

      <input
        type="date"
        className={inputClass}
        value={value.startDate ?? ""}
        onChange={(e) => update({ startDate: e.target.value || undefined })}
      />
      <input
        type="date"
        className={inputClass}
        value={value.endDate ?? ""}
        onChange={(e) => update({ endDate: e.target.value || undefined })}
      />
    </div>
  );
}