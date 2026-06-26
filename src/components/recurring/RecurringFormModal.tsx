import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CurrencyInput from "react-currency-input-field";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAccounts, useCategories } from "../../hooks/useLookups";
import { useRecurringTransactionMutations } from "../../hooks/useRecurringTransactionMutations";
import type { RecurringTransaction } from "../../services/recurringTransactionService";

const FREQUENCY_LABELS = {
  DAILY: "Diária",
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
  YEARLY: "Anual",
} as const;

const schema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  description: z.string().min(1, "Informe a descrição"),
  amount: z.number({ error: "Informe o valor" }).positive("Valor deve ser maior que zero"),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  startDate: z.string().min(1, "Informe a data de início"),
  accountId: z.number({ error: "Selecione a conta" }),
  categoryId: z.number({ error: "Selecione a categoria" }),
});

type FormValues = z.infer<typeof schema>;

type Props = { recurring?: RecurringTransaction; onClose: () => void };

const field = "w-full rounded-sm px-3.5 py-2.5 text-sm bg-white text-ink-900 ring-1 ring-line-strong outline-none focus:ring-1.5 focus:ring-pine-600 transition";
const label = "text-[13px] font-semibold text-ink-700 mb-1.5 block";

export default function RecurringFormModal({ recurring, onClose }: Props) {
  const isEdit = !!recurring;
  const accounts = useAccounts();
  const categories = useCategories();
  const { create, update } = useRecurringTransactionMutations();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: recurring
      ? {
          type: recurring.type,
          description: recurring.description,
          amount: recurring.amount,
          frequency: recurring.frequency,
          startDate: recurring.nextExecutionDate,
          accountId: recurring.accountId,
          categoryId: recurring.categoryId,
        }
      : { type: "EXPENSE", frequency: "MONTHLY", startDate: new Date().toISOString().slice(0, 10) },
  });

  const type = watch("type");

  function onSubmit(values: FormValues) {
    const done = {
      onSuccess: () => { toast.success(isEdit ? "Recorrência atualizada" : "Recorrência criada"); onClose(); },
      onError: () => toast.error("Erro ao salvar"),
    };
    if (isEdit) {
      update.mutate({ id: recurring!.id, input: values }, done);
    } else {
      create.mutate(values, done);
    }
  }

  const saving = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 bg-[rgba(10,20,16,0.5)] flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-pop p-6 w-full max-w-[440px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-xl text-ink-900">{isEdit ? "Editar" : "Nova"} recorrência</h3>
          <button type="button" onClick={onClose} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <div className="flex gap-1 bg-paper-sunk rounded-sm p-1">
            <button type="button" onClick={() => setValue("type", "EXPENSE")}
              className={`flex-1 py-2 rounded-xs text-[13px] font-semibold transition ${type === "EXPENSE" ? "bg-expense text-white" : "text-ink-500"}`}>
              Despesa
            </button>
            <button type="button" onClick={() => setValue("type", "INCOME")}
              className={`flex-1 py-2 rounded-xs text-[13px] font-semibold transition ${type === "INCOME" ? "bg-income text-white" : "text-ink-500"}`}>
              Receita
            </button>
          </div>

          <div>
            <label className={label}>Descrição</label>
            <input className={field} placeholder="Ex.: Assinatura Netflix" autoFocus {...register("description")} />
            {errors.description && <p className="text-expense text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className={label}>Valor</label>
              <Controller
                control={control}
                name="amount"
                render={({ field: f }) => (
                  <CurrencyInput
                    className={field}
                    placeholder="0,00"
                    intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                    decimalsLimit={2}
                    value={f.value}
                    onValueChange={(_, __, values) => f.onChange(values?.float ?? undefined)}
                  />
                )}
              />
              {errors.amount && <p className="text-expense text-xs mt-1">{errors.amount.message}</p>}
            </div>
            <div className="flex-1">
              <label className={label}>Frequência</label>
              <select className={field} {...register("frequency")}>
                {(Object.keys(FREQUENCY_LABELS) as Array<keyof typeof FREQUENCY_LABELS>).map((f) => (
                  <option key={f} value={f}>{FREQUENCY_LABELS[f]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className={label}>Conta</label>
              <select className={field} {...register("accountId", { valueAsNumber: true })}>
                <option value="">Selecione</option>
                {accounts.data?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              {errors.accountId && <p className="text-expense text-xs mt-1">{errors.accountId.message}</p>}
            </div>
            <div className="flex-1">
              <label className={label}>Categoria</label>
              <select className={field} {...register("categoryId", { valueAsNumber: true })}>
                <option value="">Selecione</option>
                {categories.data?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="text-expense text-xs mt-1">{errors.categoryId.message}</p>}
            </div>
          </div>

          <div>
            <label className={label}>Data de início</label>
            <input type="date" className={field} {...register("startDate")} />
            {errors.startDate && <p className="text-expense text-xs mt-1">{errors.startDate.message}</p>}
          </div>

          <div className="flex gap-2.5 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-sm text-sm font-semibold text-ink-500 hover:bg-paper-sunk hover:text-ink-900 transition">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="inline-flex items-center px-4 py-2.5 rounded-sm text-sm font-semibold bg-pine-700 text-white hover:bg-pine-800 shadow-pine disabled:opacity-45 transition active:scale-[0.975]">
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
