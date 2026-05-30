import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { authStore } from "../store/authStore";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// --- request: carimba o token em toda requisição ---
apiClient.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- response: renova no 401 e repete, com fila p/ evitar refresh duplicado ---
let isRefreshing = false;
let pendingQueue: ((token: string | null) => void)[] = [];

// libera todos os requests que estavam esperando o refresh terminar
function flushQueue(token: string | null) {
  pendingQueue.forEach((resolve) => resolve(token));
  pendingQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    // só tratamos 401; e só tentamos refresh UMA vez por request (_retry)
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const { refreshToken, setTokens, clearTokens } = authStore.getState();
    if (!refreshToken) {
      clearTokens();
      return Promise.reject(error);
    }

    original._retry = true;

    // se JÁ tem um refresh rolando, entra na fila e espera o token novo
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (token) {
            original.headers = { ...original.headers, Authorization: `Bearer ${token}` };
            resolve(apiClient(original));
          } else {
            reject(error);
          }
        });
      });
    }

    // este request é o "primeiro" 401: ele dispara o refresh
    isRefreshing = true;
    try {
      // axios "cru" (sem interceptors) p/ não cair em loop de 401
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        { refreshToken }
      );
      const newAccess = data.accessToken;

      setTokens(newAccess, refreshToken);
      flushQueue(newAccess); // libera a fila com o token novo

      original.headers = { ...original.headers, Authorization: `Bearer ${newAccess}` };
      return apiClient(original); // repete a requisição original
    } catch (refreshError) {
      flushQueue(null); // refresh falhou: rejeita todos da fila
      clearTokens(); // sessão morta → vai cair no login (Etapa 3)
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);