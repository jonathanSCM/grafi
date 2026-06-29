'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Plan {
  id: string;
  name: string;
  slug: string;
  priceMonthly: string;
  maxButtons: number;
  maxCollaborators: number;
}

const EMPTY_FORM = { name: '', slug: '', priceMonthly: '', maxButtons: '5', maxCollaborators: '1' };

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState<Record<string, { maxButtons: string; maxCollaborators: string; priceMonthly: string }>>({});
  const [error, setError] = useState<string | null>(null);

  function load() {
    api<Plan[]>('/admin/plans').then(setPlans);
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api('/admin/plans', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          priceMonthly: Number(form.priceMonthly),
          maxButtons: Number(form.maxButtons),
          maxCollaborators: Number(form.maxCollaborators),
        }),
      });
      setForm(EMPTY_FORM);
      load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  function startEdit(plan: Plan) {
    setEditing({
      ...editing,
      [plan.id]: {
        maxButtons: String(plan.maxButtons),
        maxCollaborators: String(plan.maxCollaborators),
        priceMonthly: plan.priceMonthly,
      },
    });
  }

  async function saveEdit(planId: string) {
    const draft = editing[planId];
    if (!draft) return;
    await api(`/admin/plans/${planId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        priceMonthly: Number(draft.priceMonthly),
        maxButtons: Number(draft.maxButtons),
        maxCollaborators: Number(draft.maxCollaborators),
      }),
    });
    const rest = { ...editing };
    delete rest[planId];
    setEditing(rest);
    load();
  }

  async function remove(planId: string) {
    if (!confirm('¿Eliminar este plan? Los usuarios asignados quedarán sin plan.')) return;
    await api(`/admin/plans/${planId}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Planes</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Define cuántos botones y colaboradores incluye cada plan. Estos límites se pueden sobrescribir
          por usuario o empresa de forma individual.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="flex flex-wrap gap-2 bg-white border border-neutral-200 rounded-2xl p-5"
      >
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm flex-1 min-w-[120px] outline-none focus:ring-2 focus:ring-black/10"
        />
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm flex-1 min-w-[100px] outline-none focus:ring-2 focus:ring-black/10"
        />
        <input
          placeholder="Precio/mes"
          type="number"
          step="0.01"
          value={form.priceMonthly}
          onChange={(e) => setForm({ ...form, priceMonthly: e.target.value })}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm w-28 outline-none focus:ring-2 focus:ring-black/10"
        />
        <input
          placeholder="Máx. botones"
          type="number"
          min="1"
          value={form.maxButtons}
          onChange={(e) => setForm({ ...form, maxButtons: e.target.value })}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm w-32 outline-none focus:ring-2 focus:ring-black/10"
        />
        <input
          placeholder="Máx. colaboradores"
          type="number"
          min="1"
          value={form.maxCollaborators}
          onChange={(e) => setForm({ ...form, maxCollaborators: e.target.value })}
          required
          className="border border-neutral-300 rounded-xl px-3 py-2 text-sm w-36 outline-none focus:ring-2 focus:ring-black/10"
        />
        <button
          type="submit"
          className="bg-black text-white rounded-xl px-5 font-medium text-sm hover:bg-neutral-800 transition"
        >
          Crear plan
        </button>
        {error && <p className="text-xs text-red-600 w-full">{error}</p>}
      </form>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-neutral-200 bg-neutral-50">
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Plan</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Precio/mes</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Máx. botones</th>
              <th className="py-3 px-4 font-medium text-neutral-500 text-xs uppercase tracking-wide">Máx. colaboradores</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => {
              const draft = editing[plan.id];
              return (
                <tr key={plan.id} className="border-b border-neutral-100 last:border-0">
                  <td className="py-3 px-4 font-medium">
                    {plan.name}
                    <span className="text-neutral-400 font-normal ml-1.5">/{plan.slug}</span>
                  </td>
                  {draft ? (
                    <>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          step="0.01"
                          value={draft.priceMonthly}
                          onChange={(e) =>
                            setEditing({ ...editing, [plan.id]: { ...draft, priceMonthly: e.target.value } })
                          }
                          className="border border-neutral-300 rounded-lg px-2 py-1 text-sm w-24 outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          min="1"
                          value={draft.maxButtons}
                          onChange={(e) =>
                            setEditing({ ...editing, [plan.id]: { ...draft, maxButtons: e.target.value } })
                          }
                          className="border border-neutral-300 rounded-lg px-2 py-1 text-sm w-20 outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          min="1"
                          value={draft.maxCollaborators}
                          onChange={(e) =>
                            setEditing({ ...editing, [plan.id]: { ...draft, maxCollaborators: e.target.value } })
                          }
                          className="border border-neutral-300 rounded-lg px-2 py-1 text-sm w-20 outline-none focus:ring-2 focus:ring-black/10"
                        />
                      </td>
                      <td className="py-2 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => saveEdit(plan.id)}
                          className="text-xs bg-black text-white rounded-full px-3 py-1 mr-1.5"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => {
                            const rest = { ...editing };
                            delete rest[plan.id];
                            setEditing(rest);
                          }}
                          className="text-xs border border-neutral-300 rounded-full px-3 py-1"
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4 text-neutral-600">${plan.priceMonthly}</td>
                      <td className="py-3 px-4 text-neutral-600">{plan.maxButtons}</td>
                      <td className="py-3 px-4 text-neutral-600">{plan.maxCollaborators}</td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => startEdit(plan)}
                          className="text-xs border border-neutral-300 rounded-full px-3 py-1 hover:bg-neutral-100 transition mr-1.5"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => remove(plan.id)}
                          className="text-xs border border-red-200 text-red-600 rounded-full px-3 py-1 hover:bg-red-50 transition"
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
            {plans.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-400">
                  Sin planes todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
