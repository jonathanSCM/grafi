'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import CompanyEditForm from '@/components/CompanyEditForm';
import Avatar from '@/components/Avatar';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  status: string;
  slug: string | null;
  linkCount: number;
  totalEvents: number;
}

interface Plan {
  id: string;
  name: string;
  maxCollaborators: number;
}

interface CompanyData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  website?: string | null;
  redirectEnabled: boolean;
  theme?: 'LIGHT' | 'DARK';
  backgroundType?: 'THEME' | 'SOLID' | 'GRADIENT';
  backgroundColor?: string | null;
  backgroundTo?: string | null;
  buttonColor?: string | null;
  buttonTextColor?: string | null;
  textColor?: string | null;
  plan: Plan | null;
  collaboratorLimitOverride: number | null;
  effectiveCollaboratorLimit: number;
  collaborators: Collaborator[];
  totalEvents: number;
}

export default function AdminCompanyDetailPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<CompanyData | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingLimit, setEditingLimit] = useState(false);
  const [limitDraft, setLimitDraft] = useState({ planId: '', collaboratorLimitOverride: '' });

  function load() {
    api<CompanyData>(`/admin/companies/${params.id}`)
      .then(setData)
      .catch((err) => setError(err.message));
    api<Plan[]>('/admin/plans').then(setPlans);
  }

  useEffect(load, [params.id]);

  function startEditLimit() {
    if (!data) return;
    setLimitDraft({
      planId: data.plan?.id ?? '',
      collaboratorLimitOverride:
        data.collaboratorLimitOverride !== null ? String(data.collaboratorLimitOverride) : '',
    });
    setEditingLimit(true);
  }

  async function saveLimit() {
    await api(`/admin/companies/${params.id}/limits`, {
      method: 'PATCH',
      body: JSON.stringify({
        planId: limitDraft.planId || null,
        collaboratorLimitOverride:
          limitDraft.collaboratorLimitOverride === '' ? null : Number(limitDraft.collaboratorLimitOverride),
      }),
    });
    setEditingLimit(false);
    load();
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!data) return <p className="text-sm text-neutral-500">Cargando...</p>;

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <Link href="/admin/empresas" className="text-xs text-neutral-500 hover:underline">
          ← Volver a empresas
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-1">{data.name}</h1>
        <p className="text-sm text-neutral-500 mt-1">
          /{data.slug} · vista de administrador con acceso completo
        </p>
      </div>

      <CompanyEditForm company={data} patchUrl={`/admin/companies/${data.id}`} onSaved={load} />

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5">
          <p className="text-xs text-neutral-500">Colaboradores</p>
          <p className="text-3xl font-semibold mt-1">
            {data.collaborators.length}
            <span className="text-base text-neutral-400 font-normal"> / {data.effectiveCollaboratorLimit}</span>
          </p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-5">
          <p className="text-xs text-neutral-500">Interacciones totales</p>
          <p className="text-3xl font-semibold mt-1">{data.totalEvents}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500">Plan empresarial</p>
            {!editingLimit && (
              <button onClick={startEditLimit} className="text-xs text-neutral-500 hover:underline">
                Editar
              </button>
            )}
          </div>
          {editingLimit ? (
            <div className="flex flex-col gap-2 mt-2">
              <select
                value={limitDraft.planId}
                onChange={(e) => setLimitDraft({ ...limitDraft, planId: e.target.value })}
                className="border border-neutral-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-black/10"
              >
                <option value="">Sin plan (1)</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.maxCollaborators})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                placeholder="Override personalizado"
                value={limitDraft.collaboratorLimitOverride}
                onChange={(e) => setLimitDraft({ ...limitDraft, collaboratorLimitOverride: e.target.value })}
                className="border border-neutral-300 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-black/10"
              />
              <div className="flex gap-1.5">
                <button onClick={saveLimit} className="text-xs bg-black text-white rounded-full px-3 py-1">
                  Guardar
                </button>
                <button
                  onClick={() => setEditingLimit(false)}
                  className="text-xs border border-neutral-300 rounded-full px-3 py-1"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <p className="text-lg font-semibold mt-1">
              {data.plan?.name ?? 'Sin plan'}
              {data.collaboratorLimitOverride !== null && (
                <span className="text-xs text-amber-600 border border-amber-200 bg-amber-50 rounded-full px-1.5 py-0.5 ml-2">
                  personalizado
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-neutral-200 bg-neutral-50">
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Colaborador</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Email</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Perfil</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Estado</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Botones</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Interacciones</th>
            </tr>
          </thead>
          <tbody>
            {data.collaborators.map((c) => (
              <tr key={c.id} className="border-b border-neutral-100 last:border-0">
                <td className="py-3 px-4 font-medium">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={c.name} className="w-7 h-7 text-xs" />
                    {c.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-neutral-600">{c.email}</td>
                <td className="py-3 px-4 text-neutral-600">
                  {c.slug ? (
                    <a href={`/${c.slug}`} target="_blank" rel="noreferrer" className="underline">
                      /{c.slug}
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="py-3 px-4">{c.status}</td>
                <td className="py-3 px-4">{c.linkCount}</td>
                <td className="py-3 px-4">{c.totalEvents}</td>
              </tr>
            ))}
            {data.collaborators.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-neutral-400">
                  Sin colaboradores todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
