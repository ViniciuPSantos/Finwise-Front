import { Pencil, Trash2 } from "lucide-react";
import { formatBRL, budgetBarColor } from "../../lib/format";
import type { BudgetStatus } from "../../services/budgetService";

type Props = {
  budget: BudgetStatus;
  onEdit: (b: BudgetStatus) => void;
  onDelete: (b: BudgetStatus) => void;
};

export default function BudgetCard({ budget, onEdit, onDelete }: Props) {
  const width = Math.min(budget.percentage, 100);
  const over = budget.percentage > 100;

  return (
    <div className="bg-surface rounded-md shadow-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-ink-900">{budget.categoryName}</span>
        <div className="flex gap-1">
          <button onClick={() => onEdit(budget)} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 transition">
            <Pencil size={15} />
          </button>
          <button onClick={() => onDelete(budget)} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-expense-soft hover:text-expense transition">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="h-2 bg-paper-sunk rounded-pill overflow-hidden">
        <div
          className={`h-full ${budgetBarColor(budget.percentage)} rounded-pill transition-all`}
          style={{ width: `${width}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-500 font-mono">
          {formatBRL(budget.spent)} de {formatBRL(budget.amount)}
        </span>
        <span className={over ? "text-expense font-semibold" : "text-ink-500 font-semibold"}>
          {Math.round(budget.percentage)}%
        </span>
      </div>

      {over && (
        <p className="text-expense text-[12.5px]">
          Estourou {formatBRL(Math.abs(budget.remaining))}
        </p>
      )}
    </div>
  );
}