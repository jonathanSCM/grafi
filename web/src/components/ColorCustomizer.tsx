'use client';

import type { BackgroundType } from '@/lib/types';

export interface CustomizationState {
  theme: 'LIGHT' | 'DARK';
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundTo: string;
  buttonColor: string;
  buttonTextColor: string;
  textColor: string;
}

export const DEFAULT_CUSTOMIZATION: CustomizationState = {
  theme: 'LIGHT',
  backgroundType: 'THEME',
  backgroundColor: '#FFFFFF',
  backgroundTo: '#E5E5E5',
  buttonColor: '#FFFFFF',
  buttonTextColor: '#111111',
  textColor: '#111111',
};

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center justify-between text-sm gap-3">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-neutral-300 cursor-pointer"
        />
        <span className="text-xs text-neutral-500 w-16">{value}</span>
      </div>
    </label>
  );
}

export default function ColorCustomizer({
  value,
  onChange,
}: {
  value: CustomizationState;
  onChange: (next: CustomizationState) => void;
}) {
  function set<K extends keyof CustomizationState>(key: K, val: CustomizationState[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium">Personalización</h2>

      <div className="flex gap-3 text-sm">
        <label className="flex items-center gap-1">
          <input type="radio" checked={value.theme === 'LIGHT'} onChange={() => set('theme', 'LIGHT')} />
          Light
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" checked={value.theme === 'DARK'} onChange={() => set('theme', 'DARK')} />
          Dark
        </label>
      </div>

      <div className="flex gap-2 text-sm">
        {(['THEME', 'SOLID', 'GRADIENT'] as BackgroundType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => set('backgroundType', type)}
            className={`border rounded-lg px-3 py-1.5 ${
              value.backgroundType === type ? 'bg-black text-white border-black' : 'border-neutral-300'
            }`}
          >
            {type === 'THEME' ? 'Tema' : type === 'SOLID' ? 'Color sólido' : 'Degradado'}
          </button>
        ))}
      </div>

      {value.backgroundType !== 'THEME' && (
        <div className="flex flex-col gap-2 border border-neutral-200 rounded-xl p-3">
          <ColorField
            label="Color de fondo"
            value={value.backgroundColor}
            onChange={(v) => set('backgroundColor', v)}
          />
          {value.backgroundType === 'GRADIENT' && (
            <ColorField
              label="Color final del degradado"
              value={value.backgroundTo}
              onChange={(v) => set('backgroundTo', v)}
            />
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 border border-neutral-200 rounded-xl p-3">
        <ColorField label="Color de texto" value={value.textColor} onChange={(v) => set('textColor', v)} />
        <ColorField
          label="Color de botones"
          value={value.buttonColor}
          onChange={(v) => set('buttonColor', v)}
        />
        <ColorField
          label="Texto de botones"
          value={value.buttonTextColor}
          onChange={(v) => set('buttonTextColor', v)}
        />
      </div>
    </div>
  );
}
