'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Company {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  website?: string | null;
  _count: { users: number };
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  companyId?: string | null;
  company?: { name: string } | null;
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState({ name: '', slug: '' });
  const [assign, setAssign] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  function load() {
    api<Company[]>('/admin/companies').then(setCompanies);
    api<AdminUser[]>('/admin/users').then(setUsers);
  }

  useEffect(load, []);

  function slugify(value: string) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api('/admin/companies', {
        method: 'POST',
        body: JSON.stringify({ ...form, slug: slugify(form.slug) }),
      });
      setForm({ name: '', slug: '' });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la empresa');
    }
  }

  async function handleAssign(companyId: string) {
    const userId = assign[companyId];
    if (!userId) return;
    setError(null);
    try {
      await api(`/admin/companies/${companyId}/assign`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al asignar usuario');
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Empresas</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Crea empresas y asigna usuarios como administradores de empresa (plan Empresa).
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-3 bg-white border border-neutral-200 rounded-2xl p-5"
      >
        <div className="flex gap-2">
          <input
            placeholder="Nombre de la empresa"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="border border-neutral-300 rounded-xl px-3 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-black/10"
          />
          <input
            placeholder="slug-empresa (se normaliza automáticamente)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
            className="border border-neutral-300 rounded-xl px-3 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-xl px-5 font-medium text-sm hover:bg-neutral-800 transition"
          >
            Crear
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </form>

      <div className="flex flex-col gap-3">
        {companies.map((c) => (
          <div key={c.id} className="bg-white border border-neutral-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center border border-neutral-200 shrink-0">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-neutral-400">{c.name[0]}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-neutral-500">/{c.slug} · {c._count.users} colaboradores</p>
                </div>
              </div>
              <Link
                href={`/admin/empresas/${c.id}`}
                className="text-xs border border-neutral-300 rounded-full px-3 py-1.5 hover:bg-neutral-100 transition"
              >
                Ver detalle completo
              </Link>
            </div>

            <div className="flex gap-2 mt-3">
              <select
                value={assign[c.id] ?? ''}
                onChange={(e) => setAssign({ ...assign, [c.id]: e.target.value })}
                className="border border-neutral-300 rounded-lg px-2 py-1.5 text-sm flex-1"
              >
                <option value="">Seleccionar usuario...</option>
                {users.map((u) => {
                  const belongsElsewhere = !!u.companyId && u.companyId !== c.id;
                  return (
                    <option key={u.id} value={u.id} disabled={belongsElsewhere}>
                      {u.name} ({u.email})
                      {belongsElsewhere ? ` — ya en ${u.company?.name ?? 'otra empresa'}` : ''}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() => handleAssign(c.id)}
                className="text-xs border border-neutral-300 rounded-full px-3 py-1.5 hover:bg-neutral-100 transition"
              >
                Asignar como admin de empresa
              </button>
            </div>
          </div>
        ))}
        {companies.length === 0 && (
          <p className="text-sm text-neutral-400 text-center py-8">Sin empresas todavía.</p>
        )}
      </div>
    </div>
  );
}
