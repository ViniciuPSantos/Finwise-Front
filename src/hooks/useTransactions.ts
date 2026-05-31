import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTransactions, type TransactionFilters } from "../services/transactionService";

export function useTransactions(filters: TransactionFilters){
    return useQuery({
        queryKey: ["transactions", filters],
        queryFn: () => getTransactions(filters),
        placeholderData: keepPreviousData,
    });
}