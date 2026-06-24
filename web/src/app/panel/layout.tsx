'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { api, clearToken, getRole } from '@/lib/api';

const NAV_ITEMS = [
  { href: '/panel', label: 'Resumen', icon: '⌂' },
  { href: '/panel/perfil', label: 'Mi perfil', icon: '◐' },
  { href: '/panel/links', label: 'Botones', icon: '☰' },
  { href: '/panel/tarjeta', label: 'Tarjeta NFC', icon: '◧' },
  { href: '/panel/qr', label: 'Código QR', icon: '▦' },
  { href: '/panel/analiticas', label: 'Analíticas', icon: '◷' },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasCompany, setHasCompany] = useState(false);

  useEffect(() => {
    setIsAdmin(getRole() === 'ADMIN');
    api('/companies/me')
      .then(() => setHasCompany(true))
      .catch(() => setHasCompany(false));
  }, []);

  function handleLogout() {
    clearToken();
    router.push('/login');
  }

  return (
    <div className="flex bg-neutral-50">
      <aside className="w-60 h-screen sticky top-0 border-r border-neutral-200 bg-white p-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-2 mb-6 shrink-0">
          <Image src="/logo.png" alt="Grafi" width={32} height={32} className="rounded-lg" />
          <span className="font-semibold text-sm">Grafi</span>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto min-h-0">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm py-2.5 px-3 rounded-xl flex items-center gap-2.5 transition ${
                  active
                    ? 'bg-black text-white font-medium shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span className="text-base w-4 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-neutral-100 pt-3 shrink-0">
          {hasCompany && (
            <Link
              href="/panel/empresa"
              className="text-sm py-2.5 px-3 rounded-xl flex items-center gap-2.5 text-neutral-600 hover:bg-neutral-100 transition"
            >
              <span className="text-base w-4 text-center">▣</span>
              Mi empresa
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm py-2.5 px-3 rounded-xl flex items-center gap-2.5 text-neutral-600 hover:bg-neutral-100 transition"
            >
              <span className="text-base w-4 text-center">⚙</span>
              Panel admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-sm py-2.5 px-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition flex items-center gap-2.5"
          >
            <span className="text-base w-4 text-center">×</span>
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 min-h-screen p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
