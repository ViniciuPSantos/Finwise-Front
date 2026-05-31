import { useOverview, useMonthlyEvolution } from "../hooks/useDashboard";
import StatCard from "../components/dashboard/StatCard";
import SpendingDonut from "../components/dashboard/SpendingDonut";
import EvolutionChart from "../components/dashboard/EvolutionChart";

const YEAR = 2026;
const MONTH = 5;

export default function DashboardPage() {
  const overview = useOverview(YEAR, MONTH);
  const evolution = useMonthlyEvolution("2026-01-01", "2026-05-31");

  if (overview.isLoading) {
    return <p className="text-text-secondary">Carregando...</p>;
  }
  if (overview.isError || !overview.data) {
    return <p className="text-expense">Erro ao carregar o dashboard.</p>;
  }

  const { summary, spendingByCategory } = overview.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <StatCard label="Saldo do mês" value={summary.balance} />
        <StatCard label="Receitas" value={summary.totalIncome} tone="income" />
        <StatCard label="Despesas" value={summary.totalExpense} tone="expense" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg shadow-card p-6">
          <h3 className="font-semibold mb-4">Gastos por categoria</h3>
          <SpendingDonut data={spendingByCategory} />
        </div>
        <div className="bg-surface rounded-lg shadow-card p-6">
          <h3 className="font-semibold mb-4">Evolução mensal</h3>
          {evolution.isLoading ? (
            <p className="text-text-secondary text-sm">Carregando gráfico...</p>
          ) : (
            <EvolutionChart data={evolution.data ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}
