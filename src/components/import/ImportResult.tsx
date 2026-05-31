import type { ImportResult } from "../../services/importService";

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="bg-surface rounded-lg p-4 flex-1 text-center">
      <p className={`font-mono text-3xl font-bold ${tone}`}>{value}</p>
      <p className="text-text-secondary text-sm mt-1">{label}</p>
    </div>
  );
}

export default function ImportResult({ result }: { result: ImportResult }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Stat label="Linhas no arquivo" value={result.totalRows} tone="text-text-primary" />
        <Stat label="Importadas" value={result.imported} tone="text-income" />
        <Stat label="Puladas" value={result.skipped} tone="text-expense" />
      </div>

      {result.createdCategories.length > 0 && (
        <div className="bg-surface rounded-lg p-4">
          <p className="text-sm font-medium mb-2">Categorias criadas automaticamente</p>
          <div className="flex flex-wrap gap-2">
            {result.createdCategories.map((c) => (
              <span key={c} className="bg-primary/20 text-primary text-sm rounded-md px-2 py-1">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {result.errors.length > 0 && (
        <div className="bg-surface rounded-lg p-4">
          <p className="text-sm font-medium mb-2 text-expense">
            Linhas ignoradas ({result.errors.length})
          </p>
          <table className="w-full text-sm">
            <thead className="text-text-secondary text-left">
              <tr>
                <th className="py-1 pr-4 font-medium">Linha</th>
                <th className="py-1 font-medium">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {result.errors.map((e, i) => (
                <tr key={i} className="border-t border-surface-elevated/50">
                  <td className="py-2 pr-4 font-mono text-text-secondary">{e.line}</td>
                  <td className="py-2">{e.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}