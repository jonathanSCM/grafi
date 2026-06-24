'use client';

import { Download, X, Phone, Mail, MapPin } from 'lucide-react';
import type { Profile } from '@/lib/types';
import { extractPhoneDigits, formatPhoneDisplay } from '@/lib/link-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export default function SaveContactModal({
  open,
  onClose,
  profile,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: () => void;
}) {
  if (!open) return null;

  const phoneUrl = profile.links.find((l) => l.type === 'CALL' || l.type === 'WHATSAPP')?.url;
  const phoneDigits = phoneUrl ? extractPhoneDigits(phoneUrl) : null;
  const phone = phoneDigits ? formatPhoneDisplay(phoneDigits) : null;
  const email = profile.links
    .find((l) => l.type === 'EMAIL')
    ?.url.replace('mailto:', '');

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-3.5 bg-black/45"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[380px] rounded-2xl overflow-hidden bg-white text-neutral-900 shadow-2xl"
      >
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="flex items-center gap-3">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photo}
                alt={profile.fullName}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center text-lg font-semibold text-neutral-600">
                {profile.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-semibold text-base leading-tight">{profile.fullName}</div>
              {profile.position && (
                <div className="text-sm text-neutral-500 leading-tight mt-0.5">
                  {profile.position}
                </div>
              )}
            </div>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-neutral-400 hover:text-neutral-700 transition">
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>

        <div className="border-t border-neutral-100 px-5 py-3 flex flex-col gap-3">
          <div className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
            Contacto
          </div>
          {phone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{email}</span>
            </div>
          )}
          {profile.companyName && (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{profile.companyName}</span>
            </div>
          )}
          {!phone && !email && !profile.companyName && (
            <p className="text-sm text-neutral-400">Sin datos de contacto adicionales.</p>
          )}
        </div>

        <div className="p-5 pt-3">
          <a
            href={`${API_URL}/vcard/${profile.slug}`}
            onClick={() => {
              onSave();
              onClose();
            }}
            className="w-full rounded-xl py-3 px-4 text-sm font-semibold no-underline text-white bg-black flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
          >
            <Download className="w-4 h-4" />
            Guardar contacto
          </a>
        </div>
      </div>
    </div>
  );
}
