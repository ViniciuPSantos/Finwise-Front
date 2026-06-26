import { apiClient } from "../lib/apiClient";

export type Transfer = {
  id: number;
  amount: number;
  description: string;
  date: string;
  fromAccountId: number;
  fromAccountName: string;
  toAccountId: number;
  toAccountName: string;
  createdAt: string;
};

export type TransferInput = {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  description: string;
  date: string;
};

export async function getTransfers(): Promise<Transfer[]> {
  const { data } = await apiClient.get<Transfer[]>("/api/transfers");
  return data;
}

export async function createTransfer(input: TransferInput): Promise<Transfer> {
  const { data } = await apiClient.post<Transfer>("/api/transfers", input);
  return data;
}

export async function deleteTransfer(id: number): Promise<void> {
  await apiClient.delete(`/api/transfers/${id}`);
}
