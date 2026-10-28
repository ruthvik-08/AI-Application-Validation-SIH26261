"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X, Loader2 } from "lucide-react";
import clsx from "clsx";

interface DocumentDropzoneProps {
  onFileAccepted: (file: File) => void;
  isLoading: boolean;
  accept?: Record<string, string[]>;
  label?: string;
}

export default function DocumentDropzone({
  onFileAccepted,
  isLoading,
  accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/tiff": [".tiff", ".tif"],
    "image/webp": [".webp"],
    "image/bmp": [".bmp"],
  },
  label = "Drop your document here",
}: DocumentDropzoneProps) {
  const [preview, setPreview] = useState<{ name: string; size: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: unknown[]) => {
      setError(null);
      if (rejectedFiles && (rejectedFiles as File[]).length > 0) {
        setError("File type not supported. Please upload an image (JPG/PNG/TIFF/WEBP/BMP).");
        return;
      }
      const file = acceptedFiles[0];
      if (!file) return;
      setPreview({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      });
      onFileAccepted(file);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    disabled: isLoading,
    maxSize: 20 * 1024 * 1024,
  });

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={clsx(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer min-h-[200px] p-8",
          isDragActive
            ? "border-blue-400 bg-blue-900/20 scale-[1.01]"
            : "border-slate-600 bg-slate-900/50 hover:border-blue-500 hover:bg-blue-950/20",
          isLoading && "opacity-60 cursor-not-allowed pointer-events-none"
        )}
      >
        <input {...getInputProps()} />

        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
            <p className="text-slate-300 text-sm font-medium animate-pulse">
              Processing document…
            </p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-3">
              <FileIcon className="w-6 h-6 text-blue-400 shrink-0" />
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-100 truncate max-w-[200px]">
                  {preview.name}
                </p>
                <p className="text-xs text-slate-400">{preview.size}</p>
              </div>
              <button
                onClick={clear}
                className="ml-2 p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">Click or drop to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-4 rounded-full bg-blue-950/50 border border-blue-800/50">
              <UploadCloud className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-200 font-semibold">{label}</p>
              <p className="text-slate-500 text-sm mt-1">
                JPG, PNG, TIFF, WEBP, BMP — max 20 MB
              </p>
            </div>
            {isDragActive && (
              <p className="text-blue-400 text-sm font-medium">Release to upload!</p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
          <X className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
