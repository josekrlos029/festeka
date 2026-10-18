"use client";

import { useRef } from "react";
import { track } from "@/lib/analytics";
import { EVENT_TYPES } from "@/lib/data";

/**
 * Formulario corto de Arma tu evento. Es IDÉNTICO en las dos variantes del A/B:
 * solo cambia el componente de fotos (condición de la prueba).
 * Funciona sin JavaScript: es un GET a /arma-tu-evento.
 */
export function HeroForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const touched = useRef(new Set<string>());
  const onFocus = (field: string) => {
    if (touched.current.has(field)) return;
    touched.current.add(field);
    track("hero_form_interact", { field });
  };

  const dark = tone === "dark";
  const labelCls = `flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide ${dark ? "text-[#C9C3DA]" : "text-ink-2"}`;
  const inputCls =
    "h-12 min-w-0 rounded-xl border border-line bg-white px-3 text-base font-semibold normal-case tracking-normal text-ink";

  return (
    <form
      action="/arma-tu-evento"
      method="get"
      onSubmit={() => track("hero_cta_click", { button: "ver_recomendados" })}
      className={`@container flex flex-col gap-4 rounded-3xl p-5 sm:p-6 ${dark ? "bg-ink text-white shadow-[0_16px_40px_rgba(27,21,48,0.22)]" : "bg-white text-ink shadow-[0_16px_40px_rgba(27,21,48,0.18)]"}`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-flex min-h-7 items-center rounded-full bg-marigold px-2.5 text-xs font-extrabold uppercase tracking-wide text-ink">
          Arma tu evento
        </span>
        <span className={`text-[15px] ${dark ? "text-on-night" : "text-ink-2"}`}>Gratis · 2 minutos · sin compromiso</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 @[46rem]:grid-cols-4">
        <label className={`${labelCls} col-span-2 @[46rem]:col-span-1`}>
          Tipo de evento
          <select name="tipo" className={inputCls} defaultValue="Cumpleaños infantil" onFocus={() => onFocus("tipo")}>
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Temática
          <input name="tematica" type="text" placeholder="Ej. Bob Esponja" className={inputCls} onFocus={() => onFocus("tematica")} />
        </label>
        <label className={labelCls}>
          Fecha
          <input name="fecha" type="date" className={inputCls} onFocus={() => onFocus("fecha")} />
        </label>
        <label className={labelCls}>
          Invitados
          <input name="invitados" type="number" min={1} inputMode="numeric" placeholder="65" className={inputCls} onFocus={() => onFocus("invitados")} />
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={`text-[15px] ${dark ? "text-on-night" : "text-ink-2"}`}>
          Te sugerimos 3 proveedores por categoría. Tú eliges con quién cotizar.
        </span>
        <button
          type="submit"
          className="inline-flex min-h-14 items-center gap-2.5 rounded-2xl bg-accent px-6 text-[17px] font-extrabold text-white hover:bg-accent-strong"
        >
          Ver mis recomendados
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
