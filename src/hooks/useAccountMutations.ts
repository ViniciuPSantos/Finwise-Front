import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount, updateAccount, deleteAccount, type AccountInput } from "../services/accountServices";

export function useAccountMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["accounts"] });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
    qc.invalidateQueries({ queryKey: ["transactions"] });
  };
  const create = useMutation({ mutationFn: (i: AccountInput) => createAccount(i), onSuccess: invalidate });
  const update = useMutation({ mutationFn: ({ id, input }: { id: number; input: AccountInput }) => updateAccount(id, input), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: (id: number) => deleteAccount(id), onSuccess: invalidate });
  return { create, update, remove };
}