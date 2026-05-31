import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAccounts } from "../hooks/useLookups";
import { useAccountMutations } from "../hooks/useAccountMutations";
import AccountModal from "../components/settings/AccountModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { formatBRL } from "../lib/format";
import { ACCOUNT_TYPE_LABELS, type AccountFull } from "../services/accountServices";

export default function AccountsPage() {
  const { data, isLoading, isError } = useAccounts();
  const { remove } = useAccountMutations();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AccountFull | undefined>();
  const [deleting, setDeleting] = useState<AccountFull | undefined>();

  function confirmDelete() {
    if (!deleting) return;
    remove.mutate(deleting.id, {
      onSuccess: () => { toast.success("Conta excluída"); setDeleting(undefined); },
      onError: () => toast.error("Erro ao excluir (conta com transações?)"),
    });
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Contas</h2>
        <button onClick={() => { setEditing(undefined); setModalOpen(true); }} className="flex items-center gap-2 bg-primary rounded-md px-4 py-2 text-sm font-medium">
          <Plus size={16} /> Nova conta
        </button>
      </div>

      <div className="bg-surface rounded-lg shadow-card divide-y divide-surface-elevated/50">
        {isLoading ? <p className="text-text-secondary p-6">Carregando...</p>
        : isError ? <p className="text-expense p-6">Erro ao carregar.</p>
        : data!.length === 0 ? <p className="text-text-secondary p-6">Nenhuma conta.</p>
        : (data as AccountFull[]).map((a) => (
          <div key={a.id} className="flex items-center justify-between px-5 py-3">
            <div>
              <span className="font-medium">{a.name}</span>
              <span className="text-text-secondary text-sm ml-2">{ACCOUNT_TYPE_LABELS[a.type]}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm">{formatBRL(a.balance)}</span>
              <div className="flex gap-3">
                <button onClick={() => { setEditing(a); setModalOpen(true); }} className="text-text-secondary hover:text-text-primary"><Pencil size={16} /></button>
                <button onClick={() => setDeleting(a)} className="text-text-secondary hover:text-expense"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && <AccountModal account={editing} onClose={() => setModalOpen(false)} />}
      {deleting && (
        <ConfirmDialog message={`Excluir a conta "${deleting.name}"?`} loading={remove.isPending}
          onConfirm={confirmDelete} onCancel={() => setDeleting(undefined)} />
      )}
    </div>
  );
}