'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { LinkType, ProfileLink } from '@/lib/types';
import LinkIcon from '@/components/LinkIcon';

const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: 'WHATSAPP', label: 'WhatsApp' },
  { value: 'CALL', label: 'Llamar' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'WEBSITE', label: 'Sitio web' },
  { value: 'PROJECTS', label: 'Proyectos' },
  { value: 'SCHEDULE_MEETING', label: 'Agendar reunión' },
  { value: 'SAVE_CONTACT', label: 'Guardar contacto' },
  { value: 'CUSTOM', label: 'Personalizado' },
];

export default function LinksPage() {
  const [links, setLinks] = useState<ProfileLink[]>([]);
  const [type, setType] = useState<LinkType>('CUSTOM');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  function load() {
    api<ProfileLink[]>('/links').then(setLinks);
  }

  useEffect(load, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await api('/links', { method: 'POST', body: JSON.stringify({ type, title, url }) });
    setTitle('');
    setUrl('');
    load();
  }

  async function toggleActive(link: ProfileLink) {
    await api(`/links/${link.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive: !link.isActive }),
    });
    load();
  }

  async function remove(link: ProfileLink) {
    await api(`/links/${link.id}`, { method: 'DELETE' });
    load();
  }

  async function move(index: number, direction: -1 | 1) {
    const next = [...links];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setLinks(next);
    await api('/links/reorder', {
      method: 'PATCH',
      body: JSON.stringify({ orderedIds: next.map((l) => l.id) }),
    });
  }

  return (
    <div className="max-w-xl flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Botones</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Estos son los botones de acción que verán tus visitantes en tu perfil público.
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-3 bg-white border border-neutral-200 rounded-2xl p-5"
      >
        <h2 className="text-sm font-medium">Agregar botón</h2>
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as LinkType)}
            className="border border-neutral-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          >
            {LINK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <input
            placeholder="Título del botón"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-neutral-300 rounded-xl px-3 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <input
          placeholder="URL (https://, tel:, mailto:, wa.me/...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
        <button
          type="submit"
          className="bg-black text-white rounded-xl py-2.5 font-medium text-sm hover:bg-neutral-800 transition"
        >
          Agregar botón
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {links.length === 0 && (
          <p className="text-sm text-neutral-400 text-center py-8">Aún no tienes botones. Agrega el primero arriba.</p>
        )}
        {links.map((link, i) => (
          <div
            key={link.id}
            className={`flex items-center justify-between border rounded-2xl px-4 py-3 bg-white transition ${
              link.isActive ? 'border-neutral-200' : 'border-neutral-100 opacity-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <LinkIcon type={link.type} className="w-4 h-4 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{link.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{link.clickCount} clics</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <button
                onClick={() => move(i, -1)}
                className="w-7 h-7 rounded-lg hover:bg-neutral-100 transition flex items-center justify-center"
              >
                ↑
              </button>
              <button
                onClick={() => move(i, 1)}
                className="w-7 h-7 rounded-lg hover:bg-neutral-100 transition flex items-center justify-center"
              >
                ↓
              </button>
              <button
                onClick={() => toggleActive(link)}
                className="text-xs border border-neutral-300 rounded-full px-2.5 py-1 hover:bg-neutral-100 transition ml-1"
              >
                {link.isActive ? 'Desactivar' : 'Activar'}
              </button>
              <button
                onClick={() => remove(link)}
                className="text-xs text-red-600 hover:bg-red-50 rounded-full px-2.5 py-1 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
