import { apiClient } from "../lib/apiClient";
import type { TransactionType } from "./transactionService";

export type RecurringFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

export type RecurringTransaction = {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  frequency: RecurringFrequency;
  nextExecutionDate: string;
  active: boolean;
  accountId: number;
  accountName: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
};

export type RecurringTransactionInput = {
  amount: number;
  type: TransactionType;
  description: string;
  frequency: RecurringFrequency;
  startDate: string;
  accountId: number;
  categoryId: number;
};

export async function getRecurringTransactions(): Promise<RecurringTransaction[]> {
  const { data } = await apiClient.get<RecurringTransaction[]>("/api/recurring-transactions");
  return data;
}

export async function createRecurringTransaction(input: RecurringTransactionInput): Promise<RecurringTransaction> {
  const { data } = await apiClient.post<RecurringTransaction>("/api/recurring-transactions", input);
  return data;
}

export async function updateRecurringTransaction(id: number, input: RecurringTransactionInput): Promise<RecurringTransaction> {
  const { data } = await apiClient.put<RecurringTransaction>(`/api/recurring-transactions/${id}`, input);
  return data;
}

export async function deleteRecurringTransaction(id: number): Promise<void> {
  await apiClient.delete(`/api/recurring-transactions/${id}`);
}
