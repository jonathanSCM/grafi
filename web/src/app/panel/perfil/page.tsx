'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Company, Profile, ProfileLink } from '@/lib/types';
import PhotoUploader from './PhotoUploader';
import SocialLinksManager from './SocialLinksManager';
import ColorCustomizer, { CustomizationState, DEFAULT_CUSTOMIZATION } from '@/components/ColorCustomizer';
import LivePreview from './LivePreview';

export default function ProfileEditorPage() {
  const [exists, setExists] = useState(true);
  const [form, setForm] = useState({
    slug: '',
    fullName: '',
    position: '',
    companyName: '',
    bio: '',
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [photoStyle, setPhotoStyle] = useState<'COLOR' | 'BLACK_AND_WHITE'>('COLOR');
  const [customization, setCustomization] = useState<CustomizationState>(DEFAULT_CUSTOMIZATION);
  const [linkTitles, setLinkTitles] = useState<string[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    api<Profile>('/profiles/me')
      .then((p) => {
        setExists(true);
        setCompany(p.company ?? null);
        setForm({
          slug: p.slug,
          fullName: p.fullName,
          position: p.position ?? '',
          companyName: p.company ? p.company.name : p.companyName ?? '',
          bio: p.bio ?? '',
        });
        setPhoto(p.photo ?? null);
        setLogo(p.logo ?? null);
        setPhotoStyle(p.photoStyle);
        setCustomization({
          theme: p.theme,
          backgroundType: p.backgroundType,
          backgroundColor: p.backgroundColor ?? DEFAULT_CUSTOMIZATION.backgroundColor,
          backgroundTo: p.backgroundTo ?? DEFAULT_CUSTOMIZATION.backgroundTo,
          buttonColor: p.buttonColor ?? DEFAULT_CUSTOMIZATION.buttonColor,
          buttonTextColor: p.buttonTextColor ?? DEFAULT_CUSTOMIZATION.buttonTextColor,
          textColor: p.textColor ?? DEFAULT_CUSTOMIZATION.textColor,
        });
        setLinkTitles(p.links.filter((l) => l.isActive).map((l: ProfileLink) => l.title));
      })
      .catch(() => setExists(false));
  }, []);

  async function handleSubmit() {
    if (!form.slug || !form.fullName) {
      setMessage('Slug y nombre completo son obligatorios');
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        ...form,
        photo,
        logo,
        photoStyle,
        ...customization,
      };
      if (exists) {
        await api('/profiles/me', { method: 'PATCH', body: JSON.stringify(payload) });
      } else {
        await api('/profiles', { method: 'POST', body: JSON.stringify(form) });
        await api('/profiles/me', { method: 'PATCH', body: JSON.stringify(payload) });
        setExists(true);
      }
      setMessage('Guardado correctamente');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex gap-12 items-start max-w-5xl">
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Mi perfil</h1>

        <div className="flex flex-col gap-4">
          <label className="text-sm flex flex-col gap-1">
            Slug (URL pública)
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              disabled={exists}
              required
              className="border border-neutral-300 rounded-xl px-3 py-2"
            />
          </label>

          <label className="text-sm flex flex-col gap-1">
            Nombre completo
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              className="border border-neutral-300 rounded-xl px-3 py-2"
            />
          </label>

          <label className="text-sm flex flex-col gap-1">
            Cargo
            <input
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="border border-neutral-300 rounded-xl px-3 py-2"
            />
          </label>

          <label className="text-sm flex flex-col gap-1">
            Empresa
            <input
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              disabled={!!company}
              className="border border-neutral-300 rounded-xl px-3 py-2 disabled:bg-neutral-100 disabled:text-neutral-500"
            />
            {company && (
              <span className="text-xs text-neutral-500 flex items-center gap-1.5 mt-1">
                {company.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={company.logo} alt={company.name} className="w-4 h-4 rounded-full object-cover" />
                )}
                Detectado automáticamente porque perteneces a {company.name}. No se puede editar.
              </span>
            )}
          </label>

          <label className="text-sm flex flex-col gap-1">
            Descripción
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="border border-neutral-300 rounded-xl px-3 py-2"
            />
          </label>
        </div>

        {exists && (
          <>
            <div className="flex flex-col gap-3 border-t border-neutral-200 pt-6">
              <h2 className="text-sm font-medium">Foto y logo</h2>
              <PhotoUploader value={photo} onChange={setPhoto} label="Foto" />
              <PhotoUploader value={logo} onChange={setLogo} label="Logo" />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={photoStyle === 'BLACK_AND_WHITE'}
                  onChange={(e) => setPhotoStyle(e.target.checked ? 'BLACK_AND_WHITE' : 'COLOR')}
                />
                Foto en blanco y negro
              </label>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <ColorCustomizer value={customization} onChange={setCustomization} />
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <SocialLinksManager />
            </div>
          </>
        )}

        {message && <p className="text-sm">{message}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="bg-black text-white rounded-xl py-3 font-medium disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      <LivePreview
        fullName={form.fullName}
        position={form.position}
        companyName={form.companyName}
        bio={form.bio}
        photo={photo}
        photoStyle={photoStyle}
        linkTitles={linkTitles}
        {...customization}
      />
    </div>
  );
}
