import { apiClient } from "../lib/apiClient";

export type Category = { id: number; name: string };

export async function getCategories(): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>("/api/categories");
    return data;
}