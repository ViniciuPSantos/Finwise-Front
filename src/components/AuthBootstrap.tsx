import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { refreshAccessToken } from "../services/authService";

export default function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const { refreshToken, accessToken, setTokens, clearTokens } = useAuthStore();

  useEffect(() => {
    async function bootstrap() {
      if (accessToken) {
        setReady(true);
        return;
      }
      if (refreshToken) {
        try {
          const data = await refreshAccessToken(refreshToken);
          setTokens(data.accessToken, data.refreshToken);
        } catch {
          clearTokens(); 
        }
      }
      setReady(true);
    }
    bootstrap();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">Carregando...</p>
      </div>
    );
  }
  return <>{children}</>;
}