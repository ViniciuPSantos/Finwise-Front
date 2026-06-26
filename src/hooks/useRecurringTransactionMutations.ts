import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRecurringTransaction,
  updateRecurringTransaction,
  deleteRecurringTransaction,
  type RecurringTransactionInput,
} from "../services/recurringTransactionService";

export function useRecurringTransactionMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["recurring"] });
  const create = useMutation({ mutationFn: (i: RecurringTransactionInput) => createRecurringTransaction(i), onSuccess: invalidate });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: number; input: RecurringTransactionInput }) => updateRecurringTransaction(id, input),
    onSuccess: invalidate,
  });
  const remove = useMutation({ mutationFn: (id: number) => deleteRecurringTransaction(id), onSuccess: invalidate });
  return { create, update, remove };
}
