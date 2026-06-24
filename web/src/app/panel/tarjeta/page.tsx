'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Card {
  id: string;
  serial: string | null;
  programmed: boolean;
  url: string;
}

interface CardResponse {
  card: Card | null;
  profileUrl: string;
}

export default function CardPage() {
  const [data, setData] = useState<CardResponse | null>(null);
  const [serial, setSerial] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function load() {
    api<CardResponse>('/cards/me').then((d) => {
      setData(d);
      setSerial(d.card?.serial ?? '');
    });
  }

  useEffect(load, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      await api('/cards/me', { method: 'POST', body: JSON.stringify({ serial: serial || undefined }) });
      setMessage('Guardado correctamente');
      load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function toggleProgrammed() {
    if (!data?.card) return;
    await api('/cards/me/programmed', {
      method: 'PATCH',
      body: JSON.stringify({ programmed: !data.card.programmed }),
    });
    load();
  }

  function copyUrl() {
    if (!data) return;
    navigator.clipboard.writeText(data.profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (!data) return <p className="text-sm text-neutral-500">Cargando...</p>;

  return (
    <div className="max-w-2xl flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tarjeta NFC</h1>
        <p className="text-sm text-neutral-500 mt-1">
          La tarjeta física es un chip pasivo: no tiene software propio, solo guarda esta URL.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-3">
        <h2 className="text-sm font-medium">URL que debe escribirse en el chip</h2>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-sm font-mono truncate">
            {data.profileUrl}
          </code>
          <button
            onClick={copyUrl}
            className="text-xs border border-neutral-300 rounded-full px-3 py-2 hover:bg-neutral-100 transition shrink-0"
          >
            {copied ? 'Copiado ✓' : 'Copiar'}
          </button>
        </div>
        <p className="text-xs text-neutral-500">
          Esta URL es fija. Si editas tu perfil después, no necesitas reprogramar la tarjeta.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-medium">Cómo escribir la URL en tu tarjeta</h2>
        <ol className="text-sm text-neutral-600 flex flex-col gap-3 list-decimal list-inside">
          <li>
            Descarga una app de escritura NFC en tu celular:{' '}
            <strong>NFC Tools</strong> (Android / iOS) o <strong>TagWriter</strong> (NXP, Android).
          </li>
          <li>Copia la URL de arriba con el botón &quot;Copiar&quot;.</li>
          <li>
            Abre la app, elige la opción de <strong>escribir / grabar tag</strong>, selecciona tipo{' '}
            <strong>URL / enlace</strong> y pega la dirección copiada.
          </li>
          <li>Acerca tu celular a la tarjeta NFC en blanco hasta que la app confirme la escritura.</li>
          <li>Marca la tarjeta como &quot;Programada&quot; abajo para llevar el control.</li>
        </ol>
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Esto se hace una sola vez por tarjeta física, normalmente durante el proceso de producción
          antes de entregarla. No se puede escribir un chip NFC desde un navegador de escritorio —
          es una limitación del hardware, no de la plataforma.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-medium">Registro de tu tarjeta física</h2>
        <label className="flex flex-col gap-1.5 text-sm">
          Número de serie (opcional, viene impreso en la tarjeta)
          <input
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            placeholder="Ej. NFC-00123"
            className="border border-neutral-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </label>
        {message && <p className="text-sm">{message}</p>}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-black text-white rounded-xl px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-neutral-800 transition"
          >
            {saving ? 'Guardando...' : 'Guardar serie'}
          </button>
          {data.card && (
            <button
              onClick={toggleProgrammed}
              className="text-sm border border-neutral-300 rounded-xl px-4 py-2 hover:bg-neutral-100 transition"
            >
              {data.card.programmed ? '✓ Marcada como programada' : 'Marcar como programada'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
