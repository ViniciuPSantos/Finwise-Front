import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, updateCategory, deleteCategory, type CategoryInput } from "../services/categoryService";

export function useCategoryMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["categories"] });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
    qc.invalidateQueries({ queryKey: ["transactions"] });
  };
  const create = useMutation({ mutationFn: (i: CategoryInput) => createCategory(i), onSuccess: invalidate });
  const update = useMutation({ mutationFn: ({ id, input }: { id: number; input: CategoryInput }) => updateCategory(id, input), onSuccess: invalidate });
  const remove = useMutation({ mutationFn: (id: number) => deleteCategory(id), onSuccess: invalidate });
  return { create, update, remove };
}