import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBudgetStatus,
  createBudget,
  updateBudget,
  deleteBudget,
  type BudgetInput,
} from "../services/BudgetService";

export function useBudgetStatus(year: number, month: number) {
  return useQuery({
    queryKey: ["budgets", "status", { year, month }],
    queryFn: () => getBudgetStatus(year, month),
  });
}

export function useBudgetMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["budgets"] });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const create = useMutation({
    mutationFn: (input: BudgetInput) => createBudget(input),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, input }: { id: number; input: BudgetInput }) => updateBudget(id, input),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: number) => deleteBudget(id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}