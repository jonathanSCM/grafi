'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import PasswordInput from '@/components/PasswordInput';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  profile?: { slug: string } | null;
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: 'bg-green-50 text-green-700 border-green-200',
  SUSPENDED: 'bg-red-50 text-red-700 border-red-200',
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Activo',
  SUSPENDED: 'Suspendido',
  PENDING: 'Pendiente',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function load() {
    api<AdminUser[]>('/admin/users').then(setUsers);
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await api('/admin/users', { method: 'POST', body: JSON.stringify(form) });
    setForm({ name: '', email: '', password: '' });
    load();
  }

  async function toggleStatus(user: AdminUser) {
    const status = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    await api(`/admin/users/${user.id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
        <p className="text-sm text-neutral-500 mt-1">{users.length} usuarios registrados</p>
      </div>

      <form
        onSubmit={handleCreate}
        className="flex gap-2 bg-white border border-neutral-200 rounded-2xl p-5"
      >
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-black/10"
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-black/10"
        />
        <div className="flex-1">
          <PasswordInput
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            placeholder="Contraseña"
            required
            className="border border-neutral-300 rounded-xl px-3 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white rounded-xl px-5 font-medium text-sm hover:bg-neutral-800 transition"
        >
          Crear
        </button>
      </form>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-neutral-200 bg-neutral-50">
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Nombre</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Email</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Perfil</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Estado</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition">
                <td className="py-3 px-4 font-medium">{u.name}</td>
                <td className="py-3 px-4 text-neutral-600">{u.email}</td>
                <td className="py-3 px-4 text-neutral-600">{u.profile?.slug ?? '—'}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs border rounded-full px-2.5 py-1 ${STATUS_STYLES[u.status]}`}
                  >
                    {STATUS_LABELS[u.status]}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => toggleStatus(u)}
                    className="text-xs border border-neutral-300 rounded-full px-3 py-1 hover:bg-neutral-100 transition"
                  >
                    {u.status === 'ACTIVE' ? 'Suspender' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-400">
                  Sin usuarios todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
