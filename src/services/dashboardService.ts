import { apiClient } from "../lib/apiClient";

export type CategorySpending = { categoryName: string; total: number };

export type DashboardOverview = {
    year: number;
    month: number;
    summary: { totalIncome: number; totalExpense: number; balance: number };
    spendingByCategory: CategorySpending[];
    budgetStatus: unknown[];
};

export type MonthlyEvolution = {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export async function getOverview(year: number, month: number): Promise<DashboardOverview> {
  const { data } = await apiClient.get<DashboardOverview>("/api/dashboard/overview", {
    params: { year, month },
  });
  return data;
}

export async function getMonthlyEvolution(
  startDate: string,
  endDate: string
): Promise<MonthlyEvolution[]> {
  const { data } = await apiClient.get<MonthlyEvolution[]>("/api/dashboard/monthly-evolution", {
    params: { startDate, endDate },
  });
  return data;
}