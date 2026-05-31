import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CurrencyInput from "react-currency-input-field";
import { toast } from "sonner";
import { useCategories } from "../../hooks/useLookups";
import { useBudgetMutations } from "../../hooks/useBudgets";
import type { BudgetStatus } from "../../services/budgetService";

const schema = z.object({
  amount: z.number({ error: "Informe o valor" }).positive("Valor deve ser maior que zero"),
  categoryId: z.number({ error: "Selecione a categoria" }),
});
type FormValues = z.infer<typeof schema>;

type Props = {
  budget?: BudgetStatus; // presente = edição
  year: number;
  month: number;
  onClose: () => void;
};

const field = "w-full bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary";

export default function BudgetFormModal({ budget, year, month, onClose }: Props) {
  const isEdit = !!budget;
  const categories = useCategories();
  const { create, update } = useBudgetMutations();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: budget
      ? { amount: budget.amount, categoryId: budget.categoryId }
      : {},
  });

  function onSubmit(values: FormValues) {
    const input = { ...values, year, month };
    const onDone = {
      onSuccess: () => {
        toast.success(isEdit ? "Orçamento atualizado" : "Orçamento criado");
        onClose();
      },
      onError: () => toast.error("Erro ao salvar (categoria já tem orçamento neste mês?)"),
    };
    if (isEdit) {
      update.mutate({ id: budget!.budgetId, input }, onDone);
    } else {
      create.mutate(input, onDone);
    }
  }

  const saving = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-modal p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">{isEdit ? "Editar" : "Novo"} orçamento</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm">Categoria</label>
            <select className={field} disabled={isEdit} {...register("categoryId", { valueAsNumber: true })}>
              <option value="">Selecione</option>
              {categories.data?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.categoryId && <p className="text-expense text-xs">{errors.categoryId.message}</p>}
          </div>

          <div>
            <label className="text-sm">Valor do orçamento</label>
            <Controller
              control={control}
              name="amount"
              render={({ field: f }) => (
                <CurrencyInput
                  className={field}
                  intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                  decimalsLimit={2}
                  value={f.value}
                  onValueChange={(_, __, values) => f.onChange(values?.float ?? undefined)}
                />
              )}
            />
            {errors.amount && <p className="text-expense text-xs">{errors.amount.message}</p>}
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md bg-surface-elevated">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-2 rounded-md bg-primary disabled:opacity-50">
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}