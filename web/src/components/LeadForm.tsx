'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export default function LeadForm({ slug, textColor }: { slug: string; textColor: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/profiles/${slug}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'PROFILE_FORM' }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('No se pudo enviar. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-dashed py-3.5 px-4 text-sm font-medium transition hover:opacity-80 flex items-center justify-center gap-2 mt-2"
        style={{ borderColor: `${textColor}40`, color: textColor }}
      >
        <Mail className="w-4 h-4 shrink-0" />
        Déjame tus datos
      </button>
    );
  }

  if (sent) {
    return (
      <p className="text-sm text-center opacity-70 mt-2" style={{ color: textColor }}>
        ¡Gracias! Tus datos fueron enviados.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="w-full flex flex-col gap-2 mt-2 rounded-2xl border p-4"
      style={{ borderColor: `${textColor}30` }}
    >
      <input
        placeholder="Tu nombre"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border rounded-xl px-3 py-2 text-sm outline-none bg-transparent"
        style={{ borderColor: `${textColor}30`, color: textColor }}
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border rounded-xl px-3 py-2 text-sm outline-none bg-transparent"
        style={{ borderColor: `${textColor}30`, color: textColor }}
      />
      <input
        placeholder="Teléfono"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="border rounded-xl px-3 py-2 text-sm outline-none bg-transparent"
        style={{ borderColor: `${textColor}30`, color: textColor }}
      />
      <textarea
        placeholder="Mensaje (opcional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        rows={2}
        className="border rounded-xl px-3 py-2 text-sm outline-none bg-transparent resize-none"
        style={{ borderColor: `${textColor}30`, color: textColor }}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="rounded-xl py-2.5 text-sm font-semibold bg-black text-white hover:bg-neutral-800 transition disabled:opacity-50"
      >
        {sending ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
