import { apiClient } from "../lib/apiClient";
import axios from "axios";

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

export async function refreshAccessToken(refreshToken: string) {
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
    refreshToken,
  });
  return data as { accessToken: string; refreshToken: string; tokenType: string };
}