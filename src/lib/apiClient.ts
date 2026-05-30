import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { authStore } from "../store/authStore";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


let isRefreshing = false;
let pendingQueue: ((token: string | null) => void)[] = [];


function flushQueue(token: string | null) {
  pendingQueue.forEach((resolve) => resolve(token));
  pendingQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

   
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const { refreshToken, setTokens, clearTokens } = authStore.getState();
    if (!refreshToken) {
      clearTokens();
      return Promise.reject(error);
    }

    original._retry = true;

   
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

    
    isRefreshing = true;
    try {
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        { refreshToken }
      );
      const newAccess = data.accessToken;

      setTokens(newAccess, data.refreshToken);
      flushQueue(newAccess); 

      original.headers = { ...original.headers, Authorization: `Bearer ${newAccess}` };
      return apiClient(original); 
    } catch (refreshError) {
      flushQueue(null); 
      clearTokens(); 
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);