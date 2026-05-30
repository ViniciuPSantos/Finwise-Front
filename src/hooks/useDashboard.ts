import { useQuery } from "@tanstack/react-query";
import { getOverview, getMonthlyEvolution } from "../services/dashboardService";
import { monthLabel } from "../lib/format";

export function useOverview(year: number, month: number) {
  return useQuery({
    queryKey: ["dashboard", "overview", { year, month }],
    queryFn: () => getOverview(year, month),
  });
}

export function useMonthlyEvolution(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["dashboard", "monthly-evolution", { startDate, endDate }],
    queryFn: () => getMonthlyEvolution(startDate, endDate),
    select: (data) =>
      data.map((d) => ({
        mes: monthLabel(d.month),
        receitas: d.totalIncome,
        despesas: d.totalExpense,
      })),
  });
}