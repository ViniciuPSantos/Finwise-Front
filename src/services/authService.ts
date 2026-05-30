import { apiClient } from "../lib/apiClient";

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });
  return data;
}

export async function logout(refreshToken: string): Promise<void> {
  await apiClient.post("/api/auth/logout", { refreshToken });
}