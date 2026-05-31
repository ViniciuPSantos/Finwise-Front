import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  type TransactionInput
} from "../services/transactionService";

export function useTransactionMutations(){
    const qc = useQueryClient();

    const invalidate = () => {
        qc.invalidateQueries({ queryKey: ["transactions"] });
        qc.invalidateQueries({ queryKey: ["dashboard"] });
    };

    const create = useMutation({
        mutationFn: (input: TransactionInput) => 
        createTransaction(input),
        onSuccess: invalidate,
    });

    const update = useMutation({
        mutationFn: ({ id, input }: { id: number; input: TransactionInput }) =>
            updateTransaction(id, input),
            onSuccess: invalidate,

    });

    const remove = useMutation({
        mutationFn: (id: number) => deleteTransaction(id),
        onSuccess: invalidate,
    });

    return { create, update, remove };
}