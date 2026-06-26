import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CurrencyInput from "react-currency-input-field";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAccounts } from "../../hooks/useLookups";
import { useTransferMutations } from "../../hooks/useTransferMutations";

const schema = z.object({
  fromAccountId: z.number({ error: "Selecione a conta de origem" }),
  toAccountId: z.number({ error: "Selecione a conta de destino" }),
  amount: z.number({ error: "Informe o valor" }).positive("Valor deve ser maior que zero"),
  description: z.string().min(1, "Informe a descrição"),
  date: z.string().min(1, "Informe a data"),
}).refine((d) => d.fromAccountId !== d.toAccountId, {
  message: "Origem e destino não podem ser iguais",
  path: ["toAccountId"],
});

type FormValues = z.infer<typeof schema>;

const field = "w-full rounded-sm px-3.5 py-2.5 text-sm bg-white text-ink-900 ring-1 ring-line-strong outline-none focus:ring-1.5 focus:ring-pine-600 transition";
const label = "text-[13px] font-semibold text-ink-700 mb-1.5 block";

export default function TransferFormModal({ onClose }: { onClose: () => void }) {
  const accounts = useAccounts();
  const { create } = useTransferMutations();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { date: new Date().toISOString().slice(0, 10) },
  });

  function onSubmit(values: FormValues) {
    create.mutate(values, {
      onSuccess: () => { toast.success("Transferência criada"); onClose(); },
      onError: () => toast.error("Erro ao criar transferência"),
    });
  }

  return (
    <div className="fixed inset-0 bg-[rgba(10,20,16,0.5)] flex items-center justify-center p-5 z-50" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-pop p-6 w-full max-w-[440px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-xl text-ink-900">Nova transferência</h3>
          <button type="button" onClick={onClose} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <div>
            <label className={label}>Descrição</label>
            <input className={field} placeholder="Ex.: Reserva de emergência" autoFocus {...register("description")} />
            {errors.description && <p className="text-expense text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
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

          <div className="flex gap-3">
            <div className="flex-1">
              <label className={label}>De (origem)</label>
              <select className={field} {...register("fromAccountId", { valueAsNumber: true })}>
                <option value="">Selecione</option>
                {accounts.data?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              {errors.fromAccountId && <p className="text-expense text-xs mt-1">{errors.fromAccountId.message}</p>}
            </div>
            <div className="flex-1">
              <label className={label}>Para (destino)</label>
              <select className={field} {...register("toAccountId", { valueAsNumber: true })}>
                <option value="">Selecione</option>
                {accounts.data?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
              {errors.toAccountId && <p className="text-expense text-xs mt-1">{errors.toAccountId.message}</p>}
            </div>
          </div>

          <div>
            <label className={label}>Data</label>
            <input type="date" className={field} {...register("date")} />
            {errors.date && <p className="text-expense text-xs mt-1">{errors.date.message}</p>}
          </div>

          <div className="flex gap-2.5 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-sm text-sm font-semibold text-ink-500 hover:bg-paper-sunk hover:text-ink-900 transition">
              Cancelar
            </button>
            <button type="submit" disabled={create.isPending} className="inline-flex items-center px-4 py-2.5 rounded-sm text-sm font-semibold bg-pine-700 text-white hover:bg-pine-800 shadow-pine disabled:opacity-45 transition active:scale-[0.975]">
              {create.isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
