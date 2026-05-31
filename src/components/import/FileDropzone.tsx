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
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
      className={`border-2 border-dashed rounded-md py-11 px-6 text-center cursor-pointer transition-colors bg-surface ${
        dragging ? "border-pine-500 bg-mint-50" : "border-line-strong hover:border-pine-500 hover:bg-mint-50"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      <span className="inline-flex items-center justify-center w-14 h-14 rounded-md bg-mint-100 mb-3.5">
        <UploadCloud size={26} className="text-pine-700" />
      </span>
      <p className="font-semibold text-ink-900">Arraste seu extrato ou clique para enviar</p>
      <p className="text-ink-500 text-sm mt-1">CSV ou OFX exportado do seu banco</p>
    </div>
  );
}