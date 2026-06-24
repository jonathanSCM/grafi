'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface AdminProfileCard {
  id: string;
  slug: string;
  fullName: string;
  user: { email: string };
  card: { serial: string | null; programmed: boolean; url: string } | null;
}

export default function AdminCardsPage() {
  const [profiles, setProfiles] = useState<AdminProfileCard[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  function load() {
    api<AdminProfileCard[]>('/admin/cards').then((data) => {
      setProfiles(data);
      const next: Record<string, string> = {};
      data.forEach((p) => {
        next[p.id] = p.card?.serial ?? '';
      });
      setDrafts(next);
    });
  }

  useEffect(load, []);

  async function saveSerial(profileId: string) {
    setSavingId(profileId);
    try {
      await api(`/admin/cards/${profileId}`, {
        method: 'PATCH',
        body: JSON.stringify({ serial: drafts[profileId] || undefined }),
      });
      load();
    } finally {
      setSavingId(null);
    }
  }

  async function toggleProgrammed(profile: AdminProfileCard) {
    setSavingId(profile.id);
    try {
      await api(`/admin/cards/${profile.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ programmed: !profile.card?.programmed }),
      });
      load();
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tarjetas NFC</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Aquí gestionas la producción y programación de cada tarjeta física. El cliente solo ve el
          estado (programada / pendiente), no estos controles.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-neutral-200 bg-neutral-50">
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Usuario</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Perfil</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Serie</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">URL a programar</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Estado</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                <td className="py-3 px-4 text-neutral-600">{p.user.email}</td>
                <td className="py-3 px-4">{p.fullName}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5">
                    <input
                      value={drafts[p.id] ?? ''}
                      onChange={(e) => setDrafts((d) => ({ ...d, [p.id]: e.target.value }))}
                      placeholder="Ej. NFC-00123"
                      className="border border-neutral-300 rounded-lg px-2 py-1.5 text-xs w-32 outline-none focus:ring-2 focus:ring-black/10"
                    />
                    <button
                      onClick={() => saveSerial(p.id)}
                      disabled={savingId === p.id}
                      className="text-xs border border-neutral-300 rounded-lg px-2 py-1.5 hover:bg-neutral-100 transition disabled:opacity-50"
                    >
                      Guardar
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-neutral-600 font-mono text-xs truncate max-w-[200px]">
                  {p.card?.url ?? `/${p.slug}`}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleProgrammed(p)}
                    disabled={savingId === p.id}
                    className={`text-xs border rounded-full px-2.5 py-1 transition disabled:opacity-50 ${
                      p.card?.programmed
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {p.card?.programmed ? 'Programada' : 'Pendiente'}
                  </button>
                </td>
              </tr>
            ))}
            {profiles.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-400">
                  Ningún perfil registrado todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
