import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCategoryMutations } from "../../hooks/useCategoryMutations";
import type { Category } from "../../services/categoryService";

const schema = z.object({ name: z.string().min(1, "Informe o nome") });
type FormValues = z.infer<typeof schema>;

const field = "w-full bg-background rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary";

export default function CategoryModal({ category, onClose }: { category?: Category; onClose: () => void }) {
  const isEdit = !!category;
  const { create, update } = useCategoryMutations();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: category ? { name: category.name } : {},
  });

  function onSubmit(values: FormValues) {
    const onDone = {
      onSuccess: () => { toast.success(isEdit ? "Categoria atualizada" : "Categoria criada"); onClose(); },
      onError: () => toast.error("Erro ao salvar (nome já existe?)"),
    };
    if (isEdit) update.mutate({ id: category!.id, input: values }, onDone);
    else create.mutate(values, onDone);
  }

  const saving = create.isPending || update.isPending;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-modal p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">{isEdit ? "Editar" : "Nova"} categoria</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm">Nome</label>
            <input className={field} {...register("name")} autoFocus />
            {errors.name && <p className="text-expense text-xs">{errors.name.message}</p>}
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md bg-surface-elevated">Cancelar</button>
            <button type="submit" disabled={saving} className="flex-1 py-2 rounded-md text-white hover:bg-primary-hover bg-primary disabled:opacity-50">
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}