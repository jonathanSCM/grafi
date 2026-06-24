'use client';

import { useEffect, useState } from 'react';
import CatalogList, { CatalogItem } from './CatalogList';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export default function CatalogSection({ slug, textColor }: { slug: string; textColor: string }) {
  const [items, setItems] = useState<CatalogItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/profiles/${slug}/catalog`)
      .then((res) => (res.ok ? res.json() : []))
      .then(setItems)
      .catch(() => setItems([]));
  }, [slug]);

  return (
    <div className="mt-2">
      <CatalogList items={items} textColor={textColor} />
    </div>
  );
}
