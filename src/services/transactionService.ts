import { apiClient } from "../lib/apiClient";
import type { PageResponse } from "../lib/types";

export type TransactionType = "INCOME" | "EXPENSE";

export type Transaction = {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  accountId: number;
  accountName: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
};

export type TransactionFilters = {
  accountId?: number;
  categoryId?: number;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  page: number;
  size: number;
};

export async function getTransactions(
  filters: TransactionFilters
): Promise<PageResponse<Transaction>> {
  // monta params só com o que tem valor (filtro vazio não vai)
  const params: Record<string, string | number> = {
    page: filters.page,
    size: filters.size,
    sort: "date,desc",
  };
  if (filters.accountId) params.accountId = filters.accountId;
  if (filters.categoryId) params.categoryId = filters.categoryId;
  if (filters.type) params.type = filters.type;
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;

  const { data } = await apiClient.get<PageResponse<Transaction>>("/api/transactions", {
    params,
  });
  return data;
}

export type TransactionInput = {
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
  accountId: number;
  categoryId: number;
};

export async function createTransaction(input: TransactionInput): Promise<Transaction> {
  const { data } = await apiClient.post<Transaction>("/api/transactions", input);
  return data;
}

export async function updateTransaction(id: number, input: TransactionInput): Promise<Transaction> {
  const { data } = await apiClient.put<Transaction>(`/api/transactions/${id}`, input);
  return data;
}

export async function deleteTransaction(id: number): Promise<void> {
  await apiClient.delete(`/api/transactions/${id}`);
}