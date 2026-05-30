import { formatBRL } from "../../lib/format";

type Props = {
  label: string;
  value: number;
  tone?: "default" | "income" | "expense";
};

const toneClass = {
  default: "text-text-primary",
  income: "text-income",
  expense: "text-expense",
};

export default function StatCard({ label, value, tone = "default" }: Props) {
  return (
    <div className="bg-surface rounded-lg shadow-card p-6 flex-1">
      <p className="text-text-secondary text-sm">{label}</p>
      <p className={`font-mono text-3xl font-bold mt-2 ${toneClass[tone]}`}>
        {formatBRL(value)}
      </p>
    </div>
  );
}