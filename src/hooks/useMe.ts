import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/userService";
import { useAuthStore } from "../store/authStore";

export function useMe() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({ queryKey: ["me"], queryFn: getMe, enabled: !!accessToken });
}
