'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import PdfViewerModal from './PdfViewerModal';

export interface CatalogItem {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  link?: string | null;
}

function isPdf(url: string) {
  return /\.pdf($|\?)/i.test(url);
}

export default function CatalogList({ items, textColor }: { items: CatalogItem[]; textColor: string }) {
  const [pdfViewer, setPdfViewer] = useState<{ url: string; title: string } | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-xs uppercase tracking-wide opacity-50" style={{ color: textColor }}>
        Catálogo
      </p>
      {items.map((item) => {
        const linkIsPdf = item.link && isPdf(item.link);
        const content = (
          <div className="flex items-center gap-3 rounded-2xl border p-3" style={{ borderColor: `${textColor}30` }}>
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
            ) : linkIsPdf ? (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${textColor}10` }}
              >
                <FileText className="w-5 h-5" style={{ color: textColor }} />
              </div>
            ) : null}
            <div className="text-left">
              <p className="text-sm font-medium" style={{ color: textColor }}>
                {item.title}
              </p>
              {item.description && (
                <p className="text-xs opacity-70 mt-0.5" style={{ color: textColor }}>
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );

        if (item.link && linkIsPdf) {
          return (
            <button
              key={item.id}
              onClick={() => setPdfViewer({ url: item.link!, title: item.title })}
              className="text-left"
            >
              {content}
            </button>
          );
        }

        return item.link ? (
          <a key={item.id} href={item.link} target="_blank" rel="noreferrer">
            {content}
          </a>
        ) : (
          <div key={item.id}>{content}</div>
        );
      })}

      {pdfViewer && (
        <PdfViewerModal url={pdfViewer.url} title={pdfViewer.title} onClose={() => setPdfViewer(null)} />
      )}
    </div>
  );
}
