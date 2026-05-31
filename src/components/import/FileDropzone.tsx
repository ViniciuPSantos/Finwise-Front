import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

type Props = {
  onFile: (file: File) => void;
  disabled?: boolean;
};

export default function FileDropzone({ onFile, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Selecione um arquivo .csv");
      return;
    }
    onFile(file);
  }

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        dragging ? "border-primary bg-surface-elevated" : "border-surface-elevated"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <UploadCloud className="mx-auto mb-3 text-text-secondary" size={40} />
      <p className="font-medium">Arraste um CSV aqui ou clique para escolher</p>
      <p className="text-text-secondary text-sm mt-1">
        Colunas: date, amount, type, description, account, category
      </p>
    </div>
  );
}