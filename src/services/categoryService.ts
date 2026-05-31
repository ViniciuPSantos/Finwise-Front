import { apiClient } from "../lib/apiClient";

export type Category = { id: number; name: string };

export async function getCategories(): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>("/api/categories");
    return data;
}

export type CategoryInput = { name: string };

export async function createCategory(input: CategoryInput): Promise<Category> {
  const { data } = await apiClient.post<Category>("/api/categories", input);
  return data;
}
export async function updateCategory(id: number, input: CategoryInput): Promise<Category> {
  const { data } = await apiClient.put<Category>(`/api/categories/${id}`, input);
  return data;
}
export async function deleteCategory(id: number): Promise<void> {
  await apiClient.delete(`/api/categories/${id}`);
}