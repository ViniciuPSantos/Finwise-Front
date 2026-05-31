import { apiClient } from "../lib/apiClient";

export type Account = { id: number; name: string };

export async function getAccounts(): Promise<Account[]> {
    const { data } = await apiClient.get<Account[]>("/api/accounts");
    return data;
}

export type AccountType = "CHECKING" | "SAVINGS" | "CASH" | "CREDIT_CARD";

export type AccountFull = {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
};

export type AccountInput = {
  name: string;
  type: AccountType;
  balance: number;
};

export async function createAccount(input: AccountInput): Promise<AccountFull> {
  const { data } = await apiClient.post<AccountFull>("/api/accounts", input);
  return data;
}
export async function updateAccount(id: number, input: AccountInput): Promise<AccountFull> {
  const { data } = await apiClient.put<AccountFull>(`/api/accounts/${id}`, input);
  return data;
}
export async function deleteAccount(id: number): Promise<void> {
  await apiClient.delete(`/api/accounts/${id}`);
}

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  CHECKING: "Conta corrente",
  SAVINGS: "Poupança",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de crédito",
};