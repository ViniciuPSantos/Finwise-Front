import { formatBRL } from "../../lib/format";

type Props = {
  label: string;
  value: number;
  tone?: "default" | "income" | "expense";
};

const toneClass = {
  default: "text-ink-900",
  income: "text-income",
  expense: "text-expense",
};

export default function StatCard({ label, value, tone = "default" }: Props) {
  return (
    <div className="bg-surface rounded-md shadow-card p-6 flex-1 min-w-0">
      <p className="text-ink-500 text-sm">{label}</p>
      <p className={`font-mono text-3xl font-bold mt-2 tabular-nums ${toneClass[tone]}`}>
        {formatBRL(value)}
      </p>
    </div>
  );
}