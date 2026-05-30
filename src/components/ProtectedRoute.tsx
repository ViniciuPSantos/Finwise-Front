import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  // decisão "lazy": basta ter refresh token; o access é renovado na 1ª chamada
  const refreshToken = useAuthStore((s) => s.refreshToken);

  if (!refreshToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}