import { apiClient } from "../lib/apiClient";

export type Account = { id: number; name: string };

export async function getAccounts(): Promise<Account[]> {
    const { data } = await apiClient.get<Account[]>("/api/accounts");
    return data;
}