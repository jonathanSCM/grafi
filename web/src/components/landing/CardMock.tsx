export default function CardMock() {
  return (
    <div className="relative w-full max-w-[360px] aspect-[1.58/1] mx-auto lp-card-float">
      <div
        className="lp-notch absolute inset-0 shadow-2xl"
        style={{
          background:
            'linear-gradient(135deg, var(--ink) 0%, var(--ink-soft) 60%, var(--ink-tint) 100%)',
          boxShadow: '0 30px 60px -20px rgba(11,27,46,0.55)',
        }}
      >
        {/* sheen */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 45%, transparent 60%)',
          }}
        />

        {/* signal notch fill */}
        <div
          className="absolute top-0 right-0 w-7 h-7"
          style={{ background: 'var(--signal)', clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
        />

        {/* NFC tap zone */}
        <div className="absolute top-6 right-10 sm:right-12">
          <span className="lp-ring w-6 h-6" />
          <span className="lp-ring w-6 h-6" style={{ animationDelay: '0.9s' }} />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="relative">
            <path
              d="M7 5a9 9 0 0 1 0 14M11 8a5 5 0 0 1 0 8M15 11a1 1 0 1 1 0 2"
              stroke="#F7F3EA"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* wordmark */}
        <div className="absolute left-6 top-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center">
            <span className="lp-display text-sm font-bold" style={{ color: 'var(--ink)' }}>
              g
            </span>
          </div>
          <span className="lp-display text-sm tracking-wide text-white/95">GRAFI</span>
        </div>

        {/* chip + number row */}
        <div className="absolute left-6 bottom-14">
          <div className="w-9 h-7 rounded-[4px] mb-3" style={{ background: 'rgba(247,243,234,0.85)' }} />
          <p className="lp-mono text-[13px] tracking-[0.18em] text-white/85">•••• •••• •••• 2026</p>
        </div>

        <div className="absolute left-6 bottom-6 right-20">
          <p className="lp-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Titular</p>
          <p className="lp-display text-sm text-white/95">Tu nombre aquí</p>
        </div>

        {/* qr block */}
        <div className="absolute right-5 bottom-5 w-12 h-12 rounded-md bg-white/95 p-1.5 grid grid-cols-4 grid-rows-4 gap-[2px]">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="rounded-[1px]"
              style={{ background: [0, 1, 3, 4, 6, 9, 10, 12, 13, 15].includes(i) ? 'var(--ink)' : 'transparent' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
