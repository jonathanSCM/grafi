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
  collaborators: Collaborator[];
  totalEvents: number;
}

export default function AdminCompanyDetailPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<CompanyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    api<CompanyData>(`/admin/companies/${params.id}`)
      .then(setData)
      .catch((err) => setError(err.message));
  }

  useEffect(load, [params.id]);

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

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5">
          <p className="text-xs text-neutral-500">Colaboradores</p>
          <p className="text-3xl font-semibold mt-1">{data.collaborators.length}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-5">
          <p className="text-xs text-neutral-500">Interacciones totales</p>
          <p className="text-3xl font-semibold mt-1">{data.totalEvents}</p>
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
