import Link from "next/link";
import { BRANDS, CATEGORIES, INSPIRATION, THEMES, TRENDING } from "@/lib/data";
import { SceneImage } from "../SceneImage";

const h2 = "font-display text-[32px] font-extrabold tracking-[-0.02em]";

function planHref(params: Record<string, string>) {
  return `/arma-tu-evento?${new URLSearchParams(params).toString()}`;
}

export function Trending() {
  return (
    <section className="px-5 pt-10 sm:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-2">
        <span className="mr-1 text-sm text-ink-2">Lo más buscado en Valledupar:</span>
        {TRENDING.map((t) => (
          <Link
            key={t}
            href="/#categorias"
            className="inline-flex min-h-9 items-center rounded-full border border-line bg-white px-3.5 text-sm font-semibold text-ink hover:border-ink"
          >
            {t}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section id="categorias" className="scroll-mt-6 px-5 pt-14 sm:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5">
        <h2 className={h2}>Categorías en Valledupar</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          {CATEGORIES.map((c) => (
            <div key={c.slug} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-[18px]">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-extrabold"
                style={{ background: c.tint }}
                aria-hidden="true"
              >
                {c.name[0]}
              </span>
              <span className="text-[17px] font-bold">{c.name}</span>
              <span className="text-[13px] leading-snug text-muted">{c.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["Cuéntanos tu fiesta", "Tipo, temática, fecha, zona, invitados y presupuesto."],
    ["Elige con quién cotizar", "Te sugerimos 3 por categoría. Quita, cambia o agrega los tuyos."],
    ["Compara y decide", "Recibes un comparativo por categoría con precio y qué incluye."],
  ];
  return (
    <section className="px-5 pt-16 sm:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6 rounded-3xl bg-accent-soft p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-extrabold uppercase tracking-wide text-accent-strong">Arma tu evento</span>
            <h2 className={h2}>Todo tu evento cotizado en un solo envío</h2>
          </div>
          <Link
            href="/arma-tu-evento"
            className="inline-flex min-h-13 items-center rounded-full bg-accent px-6 text-base font-extrabold text-white hover:bg-accent-strong"
          >
            Empezar ahora
          </Link>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
          {steps.map(([title, text], i) => (
            <li key={title} className="flex flex-col gap-2 rounded-[18px] bg-white p-5">
              <span className="font-display text-[28px] font-extrabold text-accent">{i + 1}</span>
              <span className="text-[17px] font-bold">{title}</span>
              <span className="text-sm leading-relaxed text-ink-2">{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Themes() {
  return (
    <section className="px-5 pt-16 sm:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h2 className={h2}>Temáticas que se buscan esta semana</h2>
          <p className="text-ink-2">Cada temática reúne fotos etiquetadas de fiestas reales y los proveedores que las hicieron.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3">
          {THEMES.map((t) => (
            <Link
              key={t.name}
              href={planHref({ tematica: t.name })}
              className="flex flex-col overflow-hidden rounded-2xl border border-line text-ink"
            >
              <div className="relative aspect-[4/3]">
                <SceneImage palette={t.palette} label={`Fiesta temática ${t.name}`} />
              </div>
              <div className="flex flex-col gap-0.5 px-3.5 py-3">
                <span className="font-bold">{t.name}</span>
                <span className="text-[13px] text-muted">{t.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Inspiration() {
  return (
    <section id="inspiracion" className="scroll-mt-6 px-5 pt-16 sm:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5">
        <h2 className={h2}>Inspiración reciente</h2>
        <div className="columns-[240px] gap-3">
          {INSPIRATION.map((p) => (
            <Link
              key={p.id}
              href={planHref({ tipo: p.eventType === "Infantil" ? "Cumpleaños infantil" : p.eventType, tematica: p.theme })}
              className="mb-3 block break-inside-avoid overflow-hidden rounded-2xl border border-line bg-white text-ink"
            >
              <div className="relative" style={{ aspectRatio: p.ratio }}>
                <SceneImage palette={p.palette} label={p.title} />
                <span className="absolute bottom-3 left-3 rounded-lg bg-white/85 px-2 py-1 text-xs font-semibold">{p.title}</span>
              </div>
              <div className="flex flex-col gap-1.5 px-3 py-2.5">
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((tg) => (
                    <span key={tg} className="rounded-full bg-surface px-2 py-0.5 text-xs text-ink-2">
                      {tg}
                    </span>
                  ))}
                </div>
                <span className="text-[13px] text-ink-2">
                  Por <strong className="text-ink">{p.credit}</strong>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedBrands() {
  return (
    <section className="px-5 pt-16 sm:px-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5">
        <h2 className={h2}>Marcas destacadas</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
          {BRANDS.map((b) => (
            <article key={b.slug} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-[18px]">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-13 w-13 items-center justify-center rounded-full font-display text-xl font-extrabold"
                  style={{ background: b.tint }}
                  aria-hidden="true"
                >
                  {b.initial}
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[17px] font-bold">{b.name}</span>
                  <span className="text-[13px] text-muted">{b.category}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {b.verified && (
                  <span className="rounded-md bg-teal-soft px-2 py-0.5 text-xs font-bold text-teal-ink">Verificada</span>
                )}
                {b.featured && (
                  <span className="rounded-md bg-marigold-soft px-2 py-0.5 text-xs font-bold text-marigold-ink">Destacado</span>
                )}
              </div>
              <div className="flex justify-between text-sm text-ink-2">
                <span>★ {b.rating} ({b.reviews})</span>
                <span>{b.priceFrom}</span>
              </div>
              <Link
                href="/arma-tu-evento"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-accent text-sm font-extrabold text-accent hover:bg-accent hover:text-white"
              >
                + Agregar a mi evento
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Banners() {
  return (
    <section id="proveedores" className="scroll-mt-6 px-5 pt-16 sm:px-10">
      <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <div className="flex flex-col gap-3.5 rounded-[20px] bg-ink p-8 text-white">
          <span className="text-[13px] font-bold uppercase tracking-wide text-marigold">Arma tu evento</span>
          <h3 className="font-display text-[28px] font-extrabold leading-tight">
            ¿Boda, 15 años o corporativo? Te armamos el equipo completo.
          </h3>
          <p className="text-on-night">Recomendados por categoría según tu evento. Tú eliges con quién cotizar.</p>
          <Link
            href="/arma-tu-evento?tipo=Boda"
            className="inline-flex min-h-12 items-center self-start rounded-full bg-marigold px-5 font-bold text-ink"
          >
            Armar mi evento
          </Link>
        </div>
        <div className="flex flex-col gap-3.5 rounded-[20px] bg-accent-soft p-8">
          <span className="text-[13px] font-bold uppercase tracking-wide text-accent-strong">Para proveedores</span>
          <h3 className="font-display text-[28px] font-extrabold leading-tight">
            Tu portafolio, encontrado en Google por lo que la gente busca.
          </h3>
          <p className="text-ink-2">Sube tus fiestas, la IA sugiere las etiquetas y tú confirmas. Publicar es gratis.</p>
          <a
            href="https://wa.me/?text=Quiero%20publicar%20mi%20marca%20en%20Festeka"
            className="inline-flex min-h-12 items-center self-start rounded-full bg-accent px-5 font-bold text-white"
          >
            Publicar mi marca
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-surface px-5 py-12 pb-28 sm:px-10">
      <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7 text-sm">
        <div className="flex flex-col gap-2">
          <span className="font-display text-[22px] font-extrabold">Festeka</span>
          <span className="leading-relaxed text-ink-2">El directorio de proveedores de eventos de la región.</span>
          <span className="text-xs text-muted">Versión de demostración: marcas, precios y fotos son de ejemplo.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Valledupar</span>
          {["Decoración", "Catering", "Fotógrafos", "Inflables"].map((c) => (
            <Link key={c} href="/#categorias" className="text-ink-2 hover:text-ink">
              {c} en Valledupar
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Próximas ciudades</span>
          <span className="text-ink-2">Barranquilla · Santa Marta · Riohacha</span>
        </div>
      </div>
    </footer>
  );
}
