import { formatBRL } from "../../lib/format";
import { Pencil, Trash2 } from "lucide-react";
import type { Transaction } from "../../services/transactionService";

type Props = {
  rows: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
};

export default function TransactionTable({ rows, onEdit, onDelete }: Props) {
  if (rows.length === 0) {
    return <p className="text-ink-500 text-sm p-6">Nenhuma transação encontrada.</p>;
  }
  return (
    <table className="w-full min-w-[640px] text-sm border-collapse">
      <thead>
        <tr className="bg-paper-sunk text-left">
          <th className="py-2.5 px-3.5 text-[11px] uppercase tracking-[0.06em] font-semibold text-ink-400">Data</th>
          <th className="py-2.5 px-3.5 text-[11px] uppercase tracking-[0.06em] font-semibold text-ink-400">Descrição</th>
          <th className="py-2.5 px-3.5 text-[11px] uppercase tracking-[0.06em] font-semibold text-ink-400">Categoria</th>
          <th className="py-2.5 px-3.5 text-[11px] uppercase tracking-[0.06em] font-semibold text-ink-400 text-right">Valor</th>
          <th className="py-2.5 px-3.5 text-[11px] uppercase tracking-[0.06em] font-semibold text-ink-400 text-right w-20">Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id} className="border-t border-line">
            <td className="py-3 px-3.5 font-mono text-ink-400 text-[12.5px] align-top">{t.date}</td>
            <td className="py-3 px-3.5 text-ink-900">
              {t.description}
              <div className="text-ink-400 text-xs">{t.accountName}</div>
            </td>
            <td className="py-3 px-3.5">
              <span className="inline-flex items-center gap-2 text-ink-700 text-[13px]">
                <span className="w-2 h-2 rounded-full bg-pine-600" />
                {t.categoryName}
              </span>
            </td>
            <td className={`py-3 px-3.5 text-right font-mono font-bold tabular-nums ${t.type === "INCOME" ? "text-income" : "text-expense"}`}>
              {t.type === "INCOME" ? "+ " : "- "}{formatBRL(t.amount)}
            </td>
            <td className="py-3 px-3.5">
              <div className="flex gap-1 justify-end">
                <button onClick={() => onEdit(t)} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 transition">
                  <Pencil size={15} />
                </button>
                <button onClick={() => onDelete(t)} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-expense-soft hover:text-expense transition">
                  <Trash2 size={15} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}