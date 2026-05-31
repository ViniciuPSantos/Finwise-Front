import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCategories } from "../hooks/useLookups";
import { useCategoryMutations } from "../hooks/useCategoryMutations";
import CategoryModal from "../components/settings/CategoryModal";
import ConfirmDialog from "../components/ConfirmDialog";
import type { Category } from "../services/categoryService";

export default function CategoriesPage() {
  const { data, isLoading, isError } = useCategories();
  const { remove } = useCategoryMutations();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | undefined>();
  const [deleting, setDeleting] = useState<Category | undefined>();

  function confirmDelete() {
    if (!deleting) return;
    remove.mutate(deleting.id, {
      onSuccess: () => { toast.success("Categoria excluída"); setDeleting(undefined); },
      onError: () => toast.error("Erro ao excluir (categoria em uso?)"),
    });
  }

  return (
    <div className="max-w-[680px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-h2 text-ink-900">Categorias</h2>
        <button onClick={() => { setEditing(undefined); setModalOpen(true); }} className="inline-flex items-center gap-2 bg-pine-700 text-white hover:bg-pine-800 rounded-sm px-4 py-2.5 text-sm font-semibold shadow-pine transition-colors active:scale-[0.975]">
          <Plus size={17} /> Nova categoria
        </button>
      </div>

      <div className="bg-surface rounded-md shadow-card overflow-hidden">
        {isLoading ? <p className="text-ink-500 p-6">Carregando...</p>
        : isError ? <p className="text-expense p-6">Erro ao carregar.</p>
        : data!.length === 0 ? <p className="text-ink-500 p-6">Nenhuma categoria.</p>
        : data!.map((c, i) => (
          <div key={c.id} className={`flex items-center justify-between px-5 py-4 ${i ? "border-t border-line" : ""}`}>
            <span className="flex items-center gap-3 text-ink-900">
              <span className="w-2.5 h-2.5 rounded-full bg-pine-600" />
              {c.name}
            </span>
            <div className="flex gap-1">
              <button onClick={() => { setEditing(c); setModalOpen(true); }} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 transition"><Pencil size={15} /></button>
              <button onClick={() => setDeleting(c)} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-expense-soft hover:text-expense transition"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && <CategoryModal category={editing} onClose={() => setModalOpen(false)} />}
      {deleting && (
        <ConfirmDialog message={`Excluir a categoria "${deleting.name}"?`} loading={remove.isPending}
          onConfirm={confirmDelete} onCancel={() => setDeleting(undefined)} />
      )}
    </div>
  );
}