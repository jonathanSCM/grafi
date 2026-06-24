import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <Image src="/logo.svg" alt="Grafi" width={56} height={56} className="rounded-2xl shadow-lg shadow-black/10" />
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Grafi</h1>
        <p className="text-neutral-500 mt-2 max-w-sm">
          Tu perfil profesional, conectado a una tarjeta NFC y código QR.
        </p>
      </div>
      <Link
        href="/login"
        className="bg-black text-white rounded-xl px-6 py-2.5 font-medium text-sm hover:bg-neutral-800 transition"
      >
        Iniciar sesión
      </Link>
    </main>
  );
}
