import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CurrencyInput from "react-currency-input-field";
import { toast } from "sonner";
import { useAccountMutations } from "../../hooks/useAccountMutations";
import { ACCOUNT_TYPE_LABELS, type AccountFull } from "../../services/accountServices";

const schema = z.object({
  name: z.string().min(1, "Informe o nome"),
  type: z.enum(["CHECKING", "SAVINGS", "CASH", "CREDIT_CARD"]),
  balance: z.number({ error: "Informe o saldo" }),
});
type FormValues = z.infer<typeof schema>;

const field = "w-full bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary";

export default function AccountModal({ account, onClose }: { account?: AccountFull; onClose: () => void }) {
  const isEdit = !!account;
  const { create, update } = useAccountMutations();
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: account
      ? { name: account.name, type: account.type, balance: account.balance }
      : { type: "CHECKING", balance: 0 },
  });

  function onSubmit(values: FormValues) {
    const onDone = {
      onSuccess: () => { toast.success(isEdit ? "Conta atualizada" : "Conta criada"); onClose(); },
      onError: () => toast.error("Erro ao salvar (nome já existe?)"),
    };
    if (isEdit) update.mutate({ id: account!.id, input: values }, onDone);
    else create.mutate(values, onDone);
  }

  const saving = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-modal p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">{isEdit ? "Editar" : "Nova"} conta</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm">Nome</label>
            <input className={field} {...register("name")} autoFocus />
            {errors.name && <p className="text-expense text-xs">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm">Tipo</label>
            <select className={field} {...register("type")}>
              {Object.entries(ACCOUNT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm">{isEdit ? "Saldo atual" : "Saldo inicial"}</label>
            <Controller
              control={control}
              name="balance"
              render={({ field: f }) => (
                <CurrencyInput
                  className={field}
                  intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                  decimalsLimit={2}
                  disabled={isEdit}
                  value={f.value}
                  onValueChange={(_, __, values) => f.onChange(values?.float ?? 0)}
                />
              )}
            />
            {isEdit && (
              <p className="text-text-secondary text-xs mt-1">
                O saldo é atualizado automaticamente pelas transações.
              </p>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md bg-surface-elevated">Cancelar</button>
            <button type="submit" disabled={saving} className="flex-1 py-2 rounded-md bg-primary disabled:opacity-50">
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}