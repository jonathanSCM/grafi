'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQS = [
  { q: '¿Necesito instalar una app?', a: 'No. Grafi funciona desde cualquier navegador, tanto para vos como para quien recibe tu tarjeta.' },
  { q: '¿Funciona con iPhone y Android?', a: 'Sí. Se puede compartir mediante NFC, código QR o enlace directo — funciona en cualquier celular moderno.' },
  { q: '¿Puedo cambiar mis datos después?', a: 'Sí. Editás tu perfil desde tu panel cuando quieras, las veces que quieras, sin costo extra.' },
  { q: '¿Qué pasa si cambio de número o redes sociales?', a: 'Solo actualizás tu perfil. No necesitás imprimir ni pedir otra tarjeta.' },
  { q: '¿La tarjeta incluye QR?', a: 'Sí. Cada perfil tiene además un código QR dinámico, por si alguien no tiene NFC en su celular.' },
  { q: '¿Puedo usar mi logo y colores?', a: 'Sí. Podés personalizar tu perfil con tu marca, colores y estilo propio.' },
  { q: '¿Sirve para empresas?', a: 'Sí. El Plan Empresa permite administrar varios colaboradores desde un panel central, con estadísticas y leads unificados.' },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y" style={{ borderColor: 'var(--line)' }}>
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} style={{ borderColor: 'var(--line)' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base sm:text-lg font-medium" style={{ color: 'var(--ink)' }}>
                {item.q}
              </span>
              <Plus
                className="w-5 h-5 shrink-0 transition-transform duration-300"
                style={{
                  color: 'var(--signal)',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? '200px' : '0px' }}
            >
              <p className="pb-5 pr-10 text-sm leading-relaxed" style={{ color: 'var(--ink-tint)' }}>
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
