import { useState } from "react";
import { Plus, Pencil, Trash2, Landmark } from "lucide-react";
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

  const accounts = (data as AccountFull[]) ?? [];
  const total = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <div className="max-w-[680px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-h2 text-ink-900">Contas</h2>
        <button onClick={() => { setEditing(undefined); setModalOpen(true); }} className="inline-flex items-center gap-2 bg-pine-700 text-white hover:bg-pine-800 rounded-sm px-4 py-2.5 text-sm font-semibold shadow-pine transition-colors active:scale-[0.975]">
          <Plus size={17} /> Nova conta
        </button>
      </div>

      {!isLoading && !isError && accounts.length > 0 && (
        <div className="bg-vault-bg rounded-md shadow-card px-5 py-[18px] flex items-center justify-between">
          <span className="text-cream-300 text-sm">Patrimônio total</span>
          <span className="font-mono font-bold text-2xl text-mint-300 tabular-nums">{formatBRL(total)}</span>
        </div>
      )}

      <div className="bg-surface rounded-md shadow-card overflow-hidden">
        {isLoading ? <p className="text-ink-500 p-6">Carregando...</p>
        : isError ? <p className="text-expense p-6">Erro ao carregar.</p>
        : accounts.length === 0 ? <p className="text-ink-500 p-6">Nenhuma conta.</p>
        : accounts.map((a, i) => (
          <div key={a.id} className={`flex items-center justify-between px-5 py-4 ${i ? "border-t border-line" : ""}`}>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-sm bg-mint-100">
                <Landmark size={18} className="text-pine-700" />
              </span>
              <div>
                <div className="font-semibold text-ink-900 text-sm">{a.name}</div>
                <div className="text-ink-400 text-[12.5px]">{ACCOUNT_TYPE_LABELS[a.type]}</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="font-mono font-bold text-[15px] tabular-nums text-ink-900">{formatBRL(a.balance)}</span>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(a); setModalOpen(true); }} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-paper-sunk hover:text-ink-900 transition"><Pencil size={15} /></button>
                <button onClick={() => setDeleting(a)} className="inline-flex items-center justify-center w-8 h-8 rounded-xs text-ink-400 hover:bg-expense-soft hover:text-expense transition"><Trash2 size={15} /></button>
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