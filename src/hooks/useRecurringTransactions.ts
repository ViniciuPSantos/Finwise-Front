import { useQuery } from "@tanstack/react-query";
import { getRecurringTransactions } from "../services/recurringTransactionService";

export function useRecurringTransactions() {
  return useQuery({ queryKey: ["recurring"], queryFn: getRecurringTransactions });
}
