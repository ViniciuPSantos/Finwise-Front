import { formatBRL } from "../../lib/format";
import type { Transaction } from "../../services/transactionService";

export default function TransactionTable({ rows }: { rows: Transaction[] }) {
  if (rows.length === 0) {
    return <p className="text-text-secondary text-sm p-6">Nenhuma transação encontrada.</p>;
  }
  return (
    <table className="w-full text-sm">
      <thead className="text-text-secondary text-left">
        <tr className="border-b border-surface-elevated">
          <th className="py-3 px-4 font-medium">Data</th>
          <th className="py-3 px-4 font-medium">Descrição</th>
          <th className="py-3 px-4 font-medium">Categoria</th>
          <th className="py-3 px-4 font-medium">Conta</th>
          <th className="py-3 px-4 font-medium text-right">Valor</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}