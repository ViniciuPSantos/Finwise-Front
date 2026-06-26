import { apiClient } from "../lib/apiClient";

export type UserProfile = { id: number; name: string; email: string };

export async function getMe(): Promise<UserProfile> {
  const { data } = await apiClient.get<UserProfile>("/api/me");
  return data;
}
