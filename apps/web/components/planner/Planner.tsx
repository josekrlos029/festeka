"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import {
  EXTRA_CATEGORY_IDS,
  PLAN_RULES,
  categoryById,
  formatCOP,
  planFor,
  type Candidate,
} from "@/lib/data";

export type EventSummary = {
  eventType: string;
  theme: string;
  date: string;
  guests: number;
  budget: number;
  zone: string;
  source: string;
};

type OwnProvider = { id: string; name: string; whatsapp: string };

/**
 * Arma tu evento, paso 2: recomendados por categoría + selección propia.
 * v1 por reglas con datos dummy (lib/data.ts). En el sprint 6 el plan viene de
 * POST /v1/event-requests y cada cambio se guarda con PATCH (docs/05-arma-tu-evento.md).
 */
export function Planner({ summary }: { summary: EventSummary }) {
  const base = useMemo(() => planFor(summary.eventType), [summary.eventType]);
  const [categoryIds, setCategoryIds] = useState<string[]>(() => base.map((c) => c.id));
  const [qty, setQty] = useState<Record<string, number>>(() =>
    Object.fromEntries(base.map((c) => [c.id, c.defaultQty])),
  );
  const [off, setOff] = useState<Record<string, boolean>>({});
  const [own, setOwn] = useState<Record<string, OwnProvider[]>>({});
  const [openForm, setOpenForm] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    track("plan_view", { event_type: summary.eventType, theme: summary.theme || null, source: summary.source });
  }, [summary.eventType, summary.theme, summary.source]);

  const themeLabel = summary.theme || "tu temática";
  const shares = Object.fromEntries(base.map((c) => [c.id, c.budgetShare]));

  const categories = categoryIds.map((id) => {
    const cat = categoryById(id)!;
    const n = qty[id] ?? PLAN_RULES.defaultQty;
    const items = cat.pool.slice(0, n).map((c, i) => ({ ...c, key: `${id}-${i}`, on: !off[`${id}-${i}`] }));
    const owned = (own[id] ?? []).map((o) => ({ ...o, on: !off[o.id] }));
    const selected = items.filter((i) => i.on).length + owned.filter((o) => o.on).length;
    const share = shares[id] ?? 0.1;
    return { id, name: cat.name, n, items, owned, selected, budget: formatCOP(summary.budget * share) };
  });

  const total = categories.reduce((s, c) => s + c.selected, 0);
  const over = total > PLAN_RULES.maxPerRequest;
  const missing = EXTRA_CATEGORY_IDS.filter((id) => !categoryIds.includes(id));

  const toggle = (key: string, category: string, origin: string) => {
    const nowOn = Boolean(off[key]);
    track("plan_item_toggle", { category, origin, selected: nowOn });
    setOff((o) => ({ ...o, [key]: !o[key] }));
  };

  const changeQty = (id: string, delta: number) => {
    const next = Math.min(PLAN_RULES.maxQty, Math.max(1, (qty[id] ?? PLAN_RULES.defaultQty) + delta));
    track("plan_quantity_change", { category: id, quantity: next });
    setQty((q) => ({ ...q, [id]: next }));
  };

  const addOwn = (category: string, form: HTMLFormElement) => {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    if (!name) return;
    track("plan_own_provider_add", { category, has_whatsapp: Boolean(whatsapp) });
    setOwn((o) => ({ ...o, [category]: [...(o[category] ?? []), { id: `own-${category}-${Date.now()}`, name, whatsapp }] }));
    setOpenForm(null);
  };

  const dateLabel = summary.date
    ? new Intl.DateTimeFormat("es-CO", { weekday: "short", day: "numeric", month: "short" }).format(
        new Date(`${summary.date}T12:00:00`),
      )
    : "Fecha por definir";

  if (submitted) {
    return (
      <main className="mx-auto flex max-w-[720px] flex-col gap-5 px-5 py-20">
        <span className="self-start rounded-full bg-teal-soft px-3 py-1 text-sm font-bold text-teal-ink">Solicitud lista (demo)</span>
        <h1 className="font-display text-4xl font-extrabold">Pediste {total} cotizaciones en {categories.length} categorías</h1>
        <p className="text-lg text-ink-2">
          En la versión real, cada proveedor recibe tu solicitud por WhatsApp y en su panel. Te avisamos cuando lleguen
          las respuestas y te enviamos el comparativo en 24 horas. En esta demo no se envió nada.
        </p>
        <Link href="/" className="inline-flex min-h-12 items-center self-start rounded-full bg-ink px-6 font-bold text-white">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <>
      <div className="bg-ink px-5 py-8 text-white sm:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3.5">
          <ol aria-label="Pasos" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
            <li className="text-[#7FD3D2]">✓ Tu evento</li>
            <li aria-hidden="true" className="text-white/40">—</li>
            <li aria-current="step" className="text-marigold">2 Elige con quién cotizar</li>
            <li aria-hidden="true" className="text-white/40">—</li>
            <li className="text-on-night">3 Recibe y compara</li>
          </ol>
          <h1 className="font-display text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Te sugerimos estos proveedores. Tú decides con quién cotizar.
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            {[summary.eventType, summary.theme || "Sin temática", dateLabel, `${summary.guests} invitados`, summary.zone, `Presupuesto ${formatCOP(summary.budget)}`].map(
              (chip) => (
                <span key={chip} className="inline-flex min-h-8 items-center rounded-full bg-night px-3 text-sm font-semibold">
                  {chip}
                </span>
              ),
            )}
            <Link href="/" className="ml-1 text-sm font-bold text-marigold">
              Editar evento
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-[1280px] flex-wrap items-start gap-7 px-5 pb-28 pt-7 sm:px-10">
        <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-ink-2">
              <strong className="text-ink">{categories.length} categorías</strong> · recomendados según tu temática, zona, fecha y presupuesto
            </span>
            <span className="text-[13px] text-muted">Los puestos recomendados no se venden.</span>
          </div>

          {categories.map((c) => (
            <section key={c.id} aria-labelledby={`cat-${c.id}`} className="flex flex-col gap-3.5 rounded-[20px] border border-line bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
                <div className="flex flex-col gap-1">
                  <h2 id={`cat-${c.id}`} className="font-display text-2xl font-extrabold">
                    {c.name}
                  </h2>
                  <span className="text-sm text-ink-2">
                    {c.selected} seleccionados · presupuesto sugerido {c.budget}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div role="group" aria-label={`Cantidad de recomendados en ${c.name}`} className="flex items-center gap-1 rounded-full border border-line p-1">
                    <span className="pl-2.5 pr-1.5 text-[13px] text-ink-2">Recomendar</span>
                    <button type="button" aria-label="Menos" onClick={() => changeQty(c.id, -1)} className="h-9 w-9 rounded-full bg-surface text-lg font-bold">
                      −
                    </button>
                    <span className="min-w-6 text-center font-extrabold">{c.n}</span>
                    <button type="button" aria-label="Más" onClick={() => changeQty(c.id, 1)} className="h-9 w-9 rounded-full bg-surface text-lg font-bold">
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCategoryIds((ids) => ids.filter((x) => x !== c.id))}
                    className="min-h-9 px-2 text-sm font-semibold text-muted underline"
                  >
                    Quitar categoría
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                {c.items.map((it) => (
                  <CandidateCard
                    key={it.key}
                    candidate={it}
                    theme={themeLabel}
                    on={it.on}
                    onToggle={() => toggle(it.key, c.id, it.isNew ? "exploracion" : "recomendado")}
                  />
                ))}
                {c.owned.map((o) => (
                  <article key={o.id} className={`flex flex-col gap-2.5 rounded-2xl border-2 p-3 ${o.on ? "border-accent bg-white" : "border-line bg-[#FAF9FC]"}`}>
                    <span className="self-start rounded-md bg-marigold px-2 py-0.5 text-[11px] font-extrabold text-ink">Agregado por ti</span>
                    <span className="font-bold">{o.name}</span>
                    <span className="text-[13px] text-ink-2">
                      {o.whatsapp ? `Lo invitamos por WhatsApp (${o.whatsapp}) a cotizar y crear su perfil gratis.` : "Lo buscamos en Festeka para enviarle tu solicitud."}
                    </span>
                    <ToggleButton on={o.on} onClick={() => toggle(o.id, c.id, o.whatsapp ? "invitado" : "busqueda")} />
                  </article>
                ))}
                <div className="flex min-h-[220px] flex-col justify-center gap-2.5 rounded-2xl border-2 border-dashed border-[#B9B4C8] bg-white p-4">
                  {openForm === c.id ? (
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addOwn(c.id, e.currentTarget);
                      }}
                    >
                      <label className="flex flex-col gap-1 text-xs font-bold text-ink-2">
                        Nombre de la marca
                        <input name="name" required className="h-10 rounded-lg border border-line px-2.5 text-sm font-medium text-ink" />
                      </label>
                      <label className="flex flex-col gap-1 text-xs font-bold text-ink-2">
                        WhatsApp (si no está en Festeka)
                        <input name="whatsapp" inputMode="tel" className="h-10 rounded-lg border border-line px-2.5 text-sm font-medium text-ink" />
                      </label>
                      <div className="flex gap-2">
                        <button type="submit" className="min-h-10 flex-1 rounded-lg bg-ink text-sm font-bold text-white">
                          Agregar
                        </button>
                        <button type="button" onClick={() => setOpenForm(null)} className="min-h-10 rounded-lg px-3 text-sm font-semibold text-muted">
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <span className="text-[15px] font-bold">¿Ya tienes a alguien?</span>
                      <span className="text-[13px] leading-snug text-ink-2">
                        Agrega un proveedor de tus favoritos, búscalo por nombre o invítalo por WhatsApp si aún no está.
                      </span>
                      <button
                        type="button"
                        onClick={() => setOpenForm(c.id)}
                        className="min-h-10 rounded-lg bg-surface text-sm font-bold text-ink"
                      >
                        + Agregar el mío
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>
          ))}

          {missing.length > 0 && (
            <section className="flex flex-col gap-3 rounded-[20px] border border-dashed border-[#B9B4C8] p-5">
              <span className="text-[17px] font-bold">¿Necesitas algo más?</span>
              <div className="flex flex-wrap gap-2">
                {missing.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCategoryIds((ids) => [...ids, id])}
                    className="min-h-10 rounded-full border border-accent-line bg-accent-soft px-3.5 text-sm font-semibold"
                  >
                    + {categoryById(id)!.name}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside
          aria-label="Resumen de Mi evento"
          className="flex w-full flex-[1_1_320px] flex-col gap-4 rounded-[20px] border-2 border-accent bg-white p-5 lg:sticky lg:top-6 lg:max-w-[380px]"
        >
          <span className="font-display text-[22px] font-extrabold">Mi evento</span>
          <ul className="flex flex-col gap-2">
            {categories.map((c) => (
              <li key={c.id} className="flex justify-between gap-3 border-b border-[#F0EEF5] pb-2 text-[15px]">
                <span>{c.name}</span>
                <strong>{c.selected}</strong>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1">
            <span className="font-display text-3xl font-extrabold">{total} cotizaciones</span>
            <span className={`text-sm ${over ? "font-semibold text-accent-strong" : "text-ink-2"}`}>
              {over
                ? `Máximo ${PLAN_RULES.maxPerRequest} por solicitud: desmarca ${total - PLAN_RULES.maxPerRequest} para enviar`
                : `en ${categories.length} categorías · máximo ${PLAN_RULES.maxPerRequest} por solicitud`}
            </span>
          </div>
          <label className="flex flex-col gap-1.5 text-[13px] font-bold text-ink-2">
            Tu celular (te enviamos un código)
            <input type="tel" inputMode="tel" placeholder="300 000 0000" className="h-11 rounded-xl border border-line px-3 text-[15px] font-medium text-ink" />
          </label>
          <button
            type="button"
            disabled={over || total === 0}
            onClick={() => {
              track("plan_submit", { total, categories: categories.length, event_type: summary.eventType });
              setSubmitted(true);
            }}
            className="min-h-14 rounded-2xl bg-accent text-[17px] font-extrabold text-white hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            Pedir {total} cotizaciones
          </button>
          <span className="text-center text-[13px] leading-relaxed text-muted">
            Gratis y sin compromiso. Tus datos se comparten solo con quien te responda.
          </span>
        </aside>
      </main>
    </>
  );
}

function ToggleButton({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`mt-auto min-h-11 rounded-xl border text-sm font-bold ${
        on ? "border-accent bg-accent text-white" : "border-line bg-white text-ink"
      }`}
    >
      {on ? "✓ Voy a cotizar" : "Cotizar con este"}
    </button>
  );
}

function CandidateCard({
  candidate,
  theme,
  on,
  onToggle,
}: {
  candidate: Candidate;
  theme: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`flex flex-col gap-2.5 rounded-2xl border-2 p-3 ${on ? "border-accent bg-white" : "border-line bg-[#FAF9FC]"}`}>
      <div className="relative aspect-[16/10] rounded-[10px]" style={{ background: candidate.tint }}>
        {candidate.isNew && (
          <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-0.5 text-[11px] font-extrabold text-white">Nuevo en Festeka</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-bold">{candidate.name}</span>
        <span className="text-[13px] text-ink-2">
          ★ {candidate.rating} · {candidate.price}
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {candidate.reasons.map((r) => (
          <li key={r} className="flex gap-1.5 text-[13px] leading-snug">
            <span aria-hidden="true" className="font-extrabold text-teal">·</span>
            {r.replace("{tema}", theme)}
          </li>
        ))}
      </ul>
      <ToggleButton on={on} onClick={onToggle} />
    </article>
  );
}
