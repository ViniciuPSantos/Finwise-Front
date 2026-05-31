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
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Categorias</h2>
        <button onClick={() => { setEditing(undefined); setModalOpen(true); }} className="flex items-center gap-2 bg-primary rounded-md px-4 py-2 text-sm font-medium">
          <Plus size={16} /> Nova categoria
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-card divide-y divide-surface-elevated/50">
        {isLoading ? <p className="text-text-secondary p-6">Carregando...</p>
        : isError ? <p className="text-expense p-6">Erro ao carregar.</p>
        : data!.length === 0 ? <p className="text-text-secondary p-6">Nenhuma categoria.</p>
        : data!.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-5 py-3">
            <span>{c.name}</span>
            <div className="flex gap-3">
              <button onClick={() => { setEditing(c); setModalOpen(true); }} className="text-text-secondary hover:text-text-primary"><Pencil size={16} /></button>
              <button onClick={() => setDeleting(c)} className="text-text-secondary hover:text-expense"><Trash2 size={16} /></button>
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