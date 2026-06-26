import { useOverview, useMonthlyEvolution } from "../hooks/useDashboard";
import StatCard from "../components/dashboard/StatCard";
import SpendingDonut from "../components/dashboard/SpendingDonut";
import EvolutionChart from "../components/dashboard/EvolutionChart";

export default function DashboardPage() {
  const now = new Date();
  const YEAR = now.getFullYear();
  const MONTH = now.getMonth() + 1;

  const startDate = `${YEAR}-01-01`;
  const lastDay = new Date(YEAR, MONTH, 0).getDate();
  const endDate = `${YEAR}-${String(MONTH).padStart(2, "0")}-${lastDay}`;

  const overview = useOverview(YEAR, MONTH);
  const evolution = useMonthlyEvolution(startDate, endDate);

  if (overview.isLoading) {
    return <p className="text-ink-500">Carregando...</p>;
  }
  if (overview.isError || !overview.data) {
    return <p className="text-expense">Erro ao carregar o dashboard.</p>;
  }

  const { summary, spendingByCategory } = overview.data;

  return (
    <div className="max-w-[980px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <StatCard label="Saldo do mês" value={summary.balance} />
        <StatCard label="Receitas" value={summary.totalIncome} tone="income" />
        <StatCard label="Despesas" value={summary.totalExpense} tone="expense" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-surface rounded-md shadow-card p-6">
          <h3 className="font-display font-bold text-lg mb-4 text-ink-900">
            Gastos por categoria
          </h3>
          <SpendingDonut data={spendingByCategory} />
        </div>
        <div className="bg-surface rounded-md shadow-card p-6">
          <h3 className="font-display font-bold text-lg mb-4 text-ink-900">
            Evolução mensal
          </h3>
          {evolution.isLoading ? (
            <p className="text-ink-500 text-sm">Carregando gráfico...</p>
          ) : (
            <EvolutionChart data={evolution.data ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}