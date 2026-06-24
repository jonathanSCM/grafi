'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export default function QrPage() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/qr/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.blob())
      .then((blob) => setSrc(URL.createObjectURL(blob)));
  }, []);

  return (
    <div className="max-w-md flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Código QR</h1>
      <p className="text-sm text-neutral-500 mb-4">
        Este QR siempre apunta a tu perfil. Si actualizas tus datos, no necesitas generarlo de nuevo.
      </p>

      <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col items-center gap-5">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="QR de perfil" className="w-56 h-56 rounded-xl" />
        ) : (
          <div className="w-56 h-56 rounded-xl bg-neutral-100 animate-pulse" />
        )}
        {src && (
          <a
            href={src}
            download="qr-perfil.png"
            className="bg-black text-white text-sm rounded-xl px-5 py-2.5 font-medium hover:bg-neutral-800 transition"
          >
            Descargar QR
          </a>
        )}
      </div>
    </div>
  );
}
