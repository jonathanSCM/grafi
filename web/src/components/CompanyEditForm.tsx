'use client';

import { useRef, useState } from 'react';
import { api } from '@/lib/api';
import ColorCustomizer, { CustomizationState, DEFAULT_CUSTOMIZATION } from './ColorCustomizer';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export interface EditableCompany {
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  website?: string | null;
  redirectEnabled: boolean;
  theme?: 'LIGHT' | 'DARK';
  backgroundType?: CustomizationState['backgroundType'];
  backgroundColor?: string | null;
  backgroundTo?: string | null;
  buttonColor?: string | null;
  buttonTextColor?: string | null;
  textColor?: string | null;
}

export default function CompanyEditForm({
  company,
  patchUrl,
  onSaved,
}: {
  company: EditableCompany;
  patchUrl: string;
  onSaved: () => void;
}) {
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description ?? '');
  const [logo, setLogo] = useState(company.logo ?? null);
  const [website, setWebsite] = useState(company.website ?? '');
  const [redirectEnabled, setRedirectEnabled] = useState(company.redirectEnabled);
  const [customization, setCustomization] = useState<CustomizationState>({
    theme: company.theme ?? DEFAULT_CUSTOMIZATION.theme,
    backgroundType: company.backgroundType ?? DEFAULT_CUSTOMIZATION.backgroundType,
    backgroundColor: company.backgroundColor ?? DEFAULT_CUSTOMIZATION.backgroundColor,
    backgroundTo: company.backgroundTo ?? DEFAULT_CUSTOMIZATION.backgroundTo,
    buttonColor: company.buttonColor ?? DEFAULT_CUSTOMIZATION.buttonColor,
    buttonTextColor: company.buttonTextColor ?? DEFAULT_CUSTOMIZATION.buttonTextColor,
    textColor: company.textColor ?? DEFAULT_CUSTOMIZATION.textColor,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleLogoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_URL}/uploads/image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('No se pudo subir el logo');
      const { url } = await res.json();
      setLogo(url);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error al subir el logo');
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      await api(patchUrl, {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          description: description || undefined,
          logo,
          website: website || undefined,
          redirectEnabled,
          ...customization,
        }),
      });
      setMessage('Guardado correctamente');
      onSaved();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4">
      <h2 className="text-sm font-medium">Perfil de la empresa</h2>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center border border-neutral-200 shrink-0">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-neutral-400">{name[0]}</span>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-sm border border-neutral-300 rounded-lg px-3 py-1.5 hover:bg-neutral-50 disabled:opacity-50"
          >
            {uploading ? 'Subiendo...' : 'Subir logo'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleLogoFile}
          />
        </div>
      </div>

      <label className="text-sm flex flex-col gap-1.5">
        Nombre
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-neutral-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
        />
      </label>

      <label className="text-sm flex flex-col gap-1.5">
        Descripción
        <textarea
          placeholder="¿A qué se dedica la empresa?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="border border-neutral-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10 resize-none"
        />
      </label>

      <label className="text-sm flex flex-col gap-1.5">
        Sitio web
        <input
          placeholder="https://tuempresa.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="border border-neutral-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
        />
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={redirectEnabled}
          onChange={(e) => setRedirectEnabled(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Redirigir directamente al sitio web
          <span className="block text-xs text-neutral-500">
            Si lo activas, la página /empresa/{company.slug} enviará a los visitantes directo a tu
            sitio web en vez de mostrar el directorio de colaboradores.
          </span>
        </span>
      </label>

      <div className="border-t border-neutral-200 pt-4">
        <ColorCustomizer value={customization} onChange={setCustomization} />
      </div>

      {message && <p className="text-sm">{message}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-black text-white rounded-xl py-2.5 text-sm font-medium hover:bg-neutral-800 transition disabled:opacity-50 self-start px-5"
      >
        {saving ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  );
}
