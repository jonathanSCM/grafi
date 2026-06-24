'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { api, setToken } from '@/lib/api';
import PasswordInput from '@/components/PasswordInput';

const REMEMBER_KEY = 'remembered_email';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { accessToken } = await api<{ accessToken: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setToken(accessToken);
      if (remember) {
        localStorage.setItem(REMEMBER_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }
      router.push('/panel');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/brand-icon.png"
            alt="Grafi"
            width={48}
            height={48}
            className="rounded-2xl mx-auto mb-4 shadow-lg shadow-black/10"
          />
          <h1 className="text-2xl font-semibold tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-sm text-neutral-500 mt-1">Ingresa a tu panel de Grafi</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-neutral-600">Email</span>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-neutral-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-neutral-400 transition"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-neutral-600">Contraseña</span>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
              className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10 focus:border-neutral-400 transition"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-neutral-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Recordarme
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-xl py-2.5 font-medium text-sm disabled:opacity-50 hover:bg-neutral-800 transition active:scale-[0.99] mt-1"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-400 mt-6">
          <Link href="/" className="hover:text-neutral-600 transition">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </main>
  );
}
