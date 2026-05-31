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
    return <p className="text-text-secondary text-sm p-6">Nenhuma transação encontrada.</p>;
  }
  return (
    <table className="w-full min-w-[640px] text-sm">
      <thead className="text-text-secondary text-left">
        <tr className="border-b border-surface-elevated">
          <th className="py-3 px-4 font-medium">Data</th>
          <th className="py-3 px-4 font-medium">Descrição</th>
          <th className="py-3 px-4 font-medium">Categoria</th>
          <th className="py-3 px-4 font-medium">Conta</th>
          <th className="py-3 px-4 font-medium text-right">Valor</th>
          <th className="py-3 px-4 font-medium text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id} className="border-b border-surface-elevated/50">
            <td className="py-3 px-4 font-mono text-text-secondary">{t.date}</td>
            <td className="py-3 px-4">{t.description}</td>
            <td className="py-3 px-4 text-text-secondary">{t.categoryName}</td>
            <td className="py-3 px-4 text-text-secondary">{t.accountName}</td>
            <td className={`py-3 px-4 text-right font-mono ${t.type === "INCOME" ? "text-income" : "text-expense"}`}>
              {t.type === "INCOME" ? "+" : "-"}{formatBRL(t.amount)}
            </td>
            <td className="py-3 px-4">
              <div className="flex gap-2 justify-end">
                <button onClick={() => onEdit(t)} className="text-text-secondary hover:text-text-primary">
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(t)} className="text-text-secondary hover:text-expense">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}