'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AdminCard {
  id: string;
  serial: string | null;
  programmed: boolean;
  url: string;
  profile: { slug: string; fullName: string; user: { email: string } };
}

export default function AdminCardsPage() {
  const [cards, setCards] = useState<AdminCard[]>([]);

  useEffect(() => {
    api<AdminCard[]>('/admin/cards').then(setCards);
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tarjetas NFC</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Inventario de tarjetas físicas registradas por los usuarios desde su panel. El número de
          serie ayuda a rastrear cuál chip corresponde a cuál perfil para soporte y producción.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-neutral-200 bg-neutral-50">
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Usuario</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Perfil</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Serie</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">URL programada</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Estado</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((c) => (
              <tr key={c.id} className="border-b border-neutral-100 last:border-0">
                <td className="py-3 px-4 text-neutral-600">{c.profile.user.email}</td>
                <td className="py-3 px-4">{c.profile.fullName}</td>
                <td className="py-3 px-4 text-neutral-600">{c.serial ?? '—'}</td>
                <td className="py-3 px-4 text-neutral-600 font-mono text-xs">{c.url}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs border rounded-full px-2.5 py-1 ${
                      c.programmed
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {c.programmed ? 'Programada' : 'Pendiente'}
                  </span>
                </td>
              </tr>
            ))}
            {cards.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-400">
                  Ningún usuario ha registrado una tarjeta todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
