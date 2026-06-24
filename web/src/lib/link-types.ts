import type { LinkType } from './types';

export type LinkFieldKind = 'phone' | 'email' | 'username' | 'url' | 'file' | 'none';

export interface LinkTypeDef {
  type: LinkType;
  label: string;
  field: LinkFieldKind;
  placeholder: string;
  helper?: string;
  buildUrl: (value: string) => string;
}

function digitsOnly(value: string) {
  return value.replace(/[^\d+]/g, '');
}

export const LINK_TYPE_DEFS: LinkTypeDef[] = [
  {
    type: 'WHATSAPP',
    label: 'WhatsApp',
    field: 'phone',
    placeholder: 'Número de teléfono',
    buildUrl: (v) => `https://wa.me/${digitsOnly(v).replace(/^\+/, '')}`,
  },
  {
    type: 'CALL',
    label: 'Llamar',
    field: 'phone',
    placeholder: 'Número de teléfono',
    buildUrl: (v) => `tel:+${digitsOnly(v).replace(/^\+/, '')}`,
  },
  {
    type: 'EMAIL',
    label: 'Email',
    field: 'email',
    placeholder: 'correo@empresa.com',
    buildUrl: (v) => `mailto:${v.trim()}`,
  },
  {
    type: 'WEBSITE',
    label: 'Sitio web',
    field: 'url',
    placeholder: 'https://tusitio.com',
    buildUrl: (v) => normalizeUrl(v),
  },
  {
    type: 'LINKEDIN',
    label: 'LinkedIn',
    field: 'username',
    placeholder: 'usuario o /in/usuario',
    buildUrl: (v) => `https://linkedin.com/in/${stripSlashes(v)}`,
  },
  {
    type: 'INSTAGRAM',
    label: 'Instagram',
    field: 'username',
    placeholder: '@usuario',
    buildUrl: (v) => `https://instagram.com/${stripAt(v)}`,
  },
  {
    type: 'TIKTOK',
    label: 'TikTok',
    field: 'username',
    placeholder: '@usuario',
    buildUrl: (v) => `https://tiktok.com/@${stripAt(v)}`,
  },
  {
    type: 'FACEBOOK',
    label: 'Facebook',
    field: 'username',
    placeholder: 'usuario o página',
    buildUrl: (v) => `https://facebook.com/${stripSlashes(v)}`,
  },
  {
    type: 'YOUTUBE',
    label: 'YouTube',
    field: 'username',
    placeholder: '@canal',
    buildUrl: (v) => `https://youtube.com/${v.trim().startsWith('@') ? v.trim() : '@' + stripAt(v)}`,
  },
  {
    type: 'PROJECTS',
    label: 'Proyectos',
    field: 'url',
    placeholder: 'https://...',
    buildUrl: (v) => normalizeUrl(v),
  },
  {
    type: 'PDF',
    label: 'PDF',
    field: 'file',
    placeholder: 'Sube tu archivo PDF',
    helper: 'Se abrirá dentro del perfil, sin salir de la página.',
    buildUrl: (v) => v,
  },
  {
    type: 'SCHEDULE_MEETING',
    label: 'Agendar reunión',
    field: 'url',
    placeholder: 'https://calendly.com/...',
    buildUrl: (v) => normalizeUrl(v),
  },
  {
    type: 'CUSTOM',
    label: 'Personalizado',
    field: 'url',
    placeholder: 'https://...',
    buildUrl: (v) => normalizeUrl(v),
  },
];

function stripAt(v: string) {
  return v.trim().replace(/^@/, '');
}

function stripSlashes(v: string) {
  return v.trim().replace(/^\/+/, '').replace(/\/+$/, '');
}

function normalizeUrl(v: string) {
  const trimmed = v.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getLinkTypeDef(type: LinkType): LinkTypeDef {
  return LINK_TYPE_DEFS.find((d) => d.type === type) ?? LINK_TYPE_DEFS[LINK_TYPE_DEFS.length - 1];
}

export function extractPhoneDigits(url: string): string | null {
  const match = url.match(/(?:phone=|wa\.me\/|tel:\+?)(\d{6,15})/i);
  if (!match) return null;
  return match[1];
}

export function formatPhoneDisplay(digits: string): string {
  return `+${digits}`;
}
