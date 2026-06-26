import { useQuery } from "@tanstack/react-query";
import { getTransfers } from "../services/transferService";

export function useTransfers() {
  return useQuery({ queryKey: ["transfers"], queryFn: getTransfers });
}
