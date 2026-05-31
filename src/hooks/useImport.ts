import { useMutation, useQueryClient } from "@tanstack/react-query";
import { importCsv } from "../services/importService";

export function useImport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => importCsv(file),
    onSuccess: () => {
      // import mexe em tudo: transações, saldos, categorias, dashboard
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["accounts"] });
      qc.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
}