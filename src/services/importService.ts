import { apiClient } from "../lib/apiClient";

export type ImportError = { line: number; reason: string };
export type ImportResult = {
  totalRows: number;
  imported: number;
  skipped: number;
  errors: ImportError[];
  createdCategories: string[];
};

export async function importCsv(file: File): Promise<ImportResult> {
  const formData = new FormData();
  formData.append("file", file);
  // NÃO setar Content-Type — o browser gera o boundary do multipart sozinho
  const { data } = await apiClient.post<ImportResult>("/api/imports/csv", formData);
  return data;
}