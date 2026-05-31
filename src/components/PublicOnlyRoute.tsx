import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function PublicOnlyRoute() {
  const refreshToken = useAuthStore((s) => s.refreshToken);
  // já logado → não faz sentido ver landing/login/cadastro
  if (refreshToken) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}