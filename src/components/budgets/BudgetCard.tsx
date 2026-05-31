import { Pencil, Trash2 } from "lucide-react";
import { formatBRL, budgetBarColor } from "../../lib/format";
import type { BudgetStatus } from "../../services/BudgetService";

type Props = {
  budget: BudgetStatus;
  onEdit: (b: BudgetStatus) => void;
  onDelete: (b: BudgetStatus) => void;
};

export default function BudgetCard({ budget, onEdit, onDelete }: Props) {
  const width = Math.min(budget.percentage, 100);
  const over = budget.percentage > 100;

  return (
    <div className="bg-surface rounded-lg shadow-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium">{budget.categoryName}</span>
        <div className="flex gap-2">
          <button onClick={() => onEdit(budget)} className="text-text-secondary hover:text-text-primary">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(budget)} className="text-text-secondary hover:text-expense">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="h-2 bg-background rounded-full overflow-hidden">
        <div
          className={`h-full ${budgetBarColor(budget.percentage)} transition-all`}
          style={{ width: `${width}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          {formatBRL(budget.spent)} de {formatBRL(budget.amount)}
        </span>
        <span className={over ? "text-expense font-medium" : "text-text-secondary"}>
          {Math.round(budget.percentage)}%
        </span>
      </div>

      {over && (
        <p className="text-expense text-xs">
          Estourou {formatBRL(Math.abs(budget.remaining))}
        </p>
      )}
    </div>
  );
}