export const inputClass =
  "w-full rounded-lg border border-ink-700 bg-ink-900 px-3 py-2.5 text-sm text-cream-50 placeholder:text-cream-300/50 focus:border-cognac-500 focus:outline-none focus:ring-2 focus:ring-cognac-500/25";

export const labelClass = "text-sm font-semibold text-cream-200";

const btnBase =
  "inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-60";

/* Botón claro sobre fondos oscuros (uso general del sitio) */
export const btnPrimary = `${btnBase} bg-cream-50 text-ink-950 hover:bg-white`;
/* Botón oscuro sobre paneles claros */
export const btnOnLight = `${btnBase} bg-ink-950 text-cream-50 hover:bg-ink-800`;
/* Contorno sobre fondos oscuros */
export const btnOutline = `${btnBase} border border-cream-100/25 bg-transparent text-cream-50 hover:bg-cream-50/10`;
export const btnDangerOutline = `${btnBase} border border-red-500/40 bg-transparent text-red-400 hover:bg-red-500/10`;
export const btnGhost = `${btnBase} text-cream-200 hover:bg-cream-50/10`;

export const cardClass = "rounded-xl border border-ink-800 bg-ink-900 p-6";
