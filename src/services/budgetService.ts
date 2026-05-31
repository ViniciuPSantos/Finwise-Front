import { apiClient } from "../lib/apiClient";

export type BudgetStatus = {
  budgetId: number;
  categoryId: number;
  categoryName: string;
  amount: number;
  spent: number;
  remaining: number;
  percentage: number;
};

export type BudgetInput = {
  amount: number;
  categoryId: number;
  year: number;
  month: number;
};

export async function getBudgetStatus(year: number, month: number): Promise<BudgetStatus[]> {
  const { data } = await apiClient.get<BudgetStatus[]>("/api/budgets/status", {
    params: { year, month },
  });
  return data;
}

export async function createBudget(input: BudgetInput) {
  const { data } = await apiClient.post("/api/budgets", input);
  return data;
}

export async function updateBudget(id: number, input: BudgetInput) {
  const { data } = await apiClient.put(`/api/budgets/${id}`, input);
  return data;
}

export async function deleteBudget(id: number): Promise<void> {
  await apiClient.delete(`/api/budgets/${id}`);
}