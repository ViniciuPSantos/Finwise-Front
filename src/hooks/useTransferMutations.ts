import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransfer, deleteTransfer, type TransferInput } from "../services/transferService";

export function useTransferMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["transfers"] });
    qc.invalidateQueries({ queryKey: ["accounts"] });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
  };
  const create = useMutation({ mutationFn: (i: TransferInput) => createTransfer(i), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: (id: number) => deleteTransfer(id), onSuccess: invalidate });
  return { create, remove };
}
