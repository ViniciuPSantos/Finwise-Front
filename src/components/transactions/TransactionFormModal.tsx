import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CurrencyInput from "react-currency-input-field";
import { toast } from "sonner";
import { useAccounts, useCategories } from "../../hooks/useLookups";
import { useTransactionMutations } from "../../hooks/useTransactionMutations";
import type { Transaction } from "../../services/transactionService";

const schema = z.object({
  amount: z.number({ error: "Informe o valor" }).positive("Valor deve ser maior que zero"),
  type: z.enum(["INCOME", "EXPENSE"]),
  description: z.string().min(1, "Informe a descrição"),
  date: z.string().min(1, "Informe a data"),
  accountId: z.number({ error: "Selecione a conta" }),
  categoryId: z.number({ error: "Selecione a categoria" }),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  transaction?: Transaction; // presente = edição
  onClose: () => void;
};

const field = "w-full bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary";

export default function TransactionFormModal({ transaction, onClose }: Props) {
  const isEdit = !!transaction;
  const accounts = useAccounts();
  const categories = useCategories();
  const { create, update } = useTransactionMutations();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: transaction
      ? {
          amount: transaction.amount,
          type: transaction.type,
          description: transaction.description,
          date: transaction.date,
          accountId: transaction.accountId,
          categoryId: transaction.categoryId,
        }
      : { type: "EXPENSE", date: new Date().toISOString().slice(0, 10) },
  });

  function onSubmit(values: FormValues) {
    const onDone = {
      onSuccess: () => {
        toast.success(isEdit ? "Transação atualizada" : "Transação criada");
        onClose();
      },
      onError: () => toast.error("Erro ao salvar"),
    };
    if (isEdit) {
      update.mutate({ id: transaction!.id, input: values }, onDone);
    } else {
      create.mutate(values, onDone);
    }
  }

  const saving = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-modal p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">{isEdit ? "Editar" : "Nova"} transação</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm">Valor</label>
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

          <div>
            <label className="text-sm">Tipo</label>
            <select className={field} {...register("type")}>
              <option value="EXPENSE">Despesa</option>
              <option value="INCOME">Receita</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Descrição</label>
            <input className={field} {...register("description")} />
            {errors.description && <p className="text-expense text-xs">{errors.description.message}</p>}
          </div>

          <div>
            <label className="text-sm">Data</label>
            <input type="date" className={field} {...register("date")} />
            {errors.date && <p className="text-expense text-xs">{errors.date.message}</p>}
          </div>

          <div>
            <label className="text-sm">Conta</label>
            <select className={field} {...register("accountId", { valueAsNumber: true })}>
              <option value="">Selecione</option>
              {accounts.data?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            {errors.accountId && <p className="text-expense text-xs">{errors.accountId.message}</p>}
          </div>

          <div>
            <label className="text-sm">Categoria</label>
            <select className={field} {...register("categoryId", { valueAsNumber: true })}>
              <option value="">Selecione</option>
              {categories.data?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.categoryId && <p className="text-expense text-xs">{errors.categoryId.message}</p>}
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md bg-surface-elevated">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-2 rounded-md bg-primary text-white hover:bg-primary-hover disabled:opacity-50">
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}