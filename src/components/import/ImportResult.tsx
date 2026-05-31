import { CircleCheck } from "lucide-react";
import type { ImportResult } from "../../services/importService";

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-400">{label}</p>
      <p className={`font-mono text-[22px] font-bold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}

export default function ImportResult({ result }: { result: ImportResult }) {
  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-md shadow-card p-5">
        <div className="flex items-center gap-2.5 mb-3.5">
          <CircleCheck size={20} className="text-income" />
          <span className="font-semibold text-ink-900">Importação concluída</span>
        </div>
        <div className="flex gap-6">
          <Stat label="Linhas" value={result.totalRows} tone="text-ink-400" />
          <Stat label="Importadas" value={result.imported} tone="text-income" />
          <Stat label="Puladas" value={result.skipped} tone="text-ink-400" />
        </div>
      </div>

      {result.createdCategories.length > 0 && (
        <div className="bg-surface rounded-md shadow-card p-5">
          <p className="text-sm font-semibold mb-2 text-ink-900">Categorias criadas automaticamente</p>
          <div className="flex flex-wrap gap-2">
            {result.createdCategories.map((c) => (
              <span key={c} className="bg-mint-100 text-pine-700 text-sm rounded-pill px-3 py-1 font-medium">{c}</span>
            ))}
          </div>
        </div>
      )}

      {result.errors.length > 0 && (
        <div className="bg-surface rounded-md shadow-card p-5">
          <p className="text-sm font-semibold mb-2 text-expense">Linhas ignoradas ({result.errors.length})</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-400">
                <th className="py-1 pr-4 font-medium">Linha</th>
                <th className="py-1 font-medium">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {result.errors.map((e, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="py-2 pr-4 font-mono text-ink-400">{e.line}</td>
                  <td className="py-2 text-ink-700">{e.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}