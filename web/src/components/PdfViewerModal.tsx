'use client';

import { X, Download } from 'lucide-react';

export default function PdfViewerModal({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-black/80" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full h-full sm:max-w-3xl sm:h-[90vh] sm:m-auto bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 shrink-0">
          <p className="text-sm font-medium truncate">{title}</p>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-neutral-800 transition"
              aria-label="Descargar"
            >
              <Download className="w-[18px] h-[18px]" />
            </a>
            <button onClick={onClose} aria-label="Cerrar" className="text-neutral-500 hover:text-neutral-800 transition">
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
        <iframe src={url} title={title} className="flex-1 w-full" />
      </div>
    </div>
  );
}
