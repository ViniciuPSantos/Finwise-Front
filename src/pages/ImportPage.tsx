import { useState } from "react";
import { toast } from "sonner";
import { useImport } from "../hooks/useImport";
import FileDropzone from "../components/import/FileDropzone";
import ImportResultView from "../components/import/ImportResult";

export default function ImportPage() {
  const importMutation = useImport();
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File) {
    setFileName(file.name);
    importMutation.mutate(file, {
      onSuccess: (result) => toast.success(`${result.imported} transações importadas`),
      onError: () => toast.error("Falha ao importar o arquivo"),
    });
  }

  return (
    <div className="max-w-[680px] mx-auto space-y-6">
      <h2 className="font-display font-bold text-h2 text-ink-900">Importar transações</h2>

      <FileDropzone onFile={handleFile} disabled={importMutation.isPending} />

      {importMutation.isPending && (
        <p className="text-ink-500 text-sm">Importando {fileName}...</p>
      )}
      {importMutation.isError && (
        <p className="text-expense text-sm">Erro ao importar. Verifique o arquivo e tente novamente.</p>
      )}
      {importMutation.data && <ImportResultView result={importMutation.data} />}
    </div>
  );
}