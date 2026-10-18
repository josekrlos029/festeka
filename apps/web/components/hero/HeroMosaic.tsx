import { HERO_PHOTOS } from "@/lib/data";
import { Header } from "../Header";
import { SceneImage } from "../SceneImage";
import { TrackedLink } from "../TrackedLink";
import { HeroCopy } from "./HeroCopy";
import { HeroForm } from "./HeroForm";
import { HeroShell } from "./HeroShell";

/** Variante A: formulario a la izquierda, mosaico de fiestas reales a la derecha. */
const SPANS = [
  "col-span-2 row-span-3",
  "col-span-2 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

export function photoHref(p: (typeof HERO_PHOTOS)[number]) {
  const q = new URLSearchParams({ tipo: p.eventType, tematica: p.theme, desde: "foto" });
  return `/arma-tu-evento?${q.toString()}`;
}

export function HeroMosaic() {
  return (
    <>
      <Header />
      <HeroShell variant="a" className="bg-surface px-5 pb-16 pt-10 sm:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-10">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
            <HeroCopy />
            <HeroForm tone="dark" />
            <TrackedLink href="/#categorias" event="hero_search_click" className="text-[15px] font-bold text-accent hover:text-accent-strong">
              O busca un proveedor puntual →
            </TrackedLink>
          </div>
          <div className="grid min-w-0 flex-[1.25_1_520px] auto-rows-[128px] grid-flow-dense grid-cols-4 gap-2.5">
            {HERO_PHOTOS.map((p, i) => (
              <TrackedLink
                key={p.id}
                href={photoHref(p)}
                event="hero_photo_click"
                props={{ photo_id: p.id, brand_id: p.brandSlug, position: i + 1, variant: "a" }}
                className={`relative overflow-hidden rounded-[18px] ${SPANS[i]}`}
              >
                <SceneImage palette={p.palette} label={`Foto de ${p.title}`} />
                <span className="absolute inset-x-2.5 bottom-2.5 flex flex-col rounded-[10px] bg-white/90 px-2.5 py-1.5 text-xs leading-snug">
                  <strong className="text-[13px] text-ink">{p.title}</strong>
                  <span className="text-ink-2">{p.credit}</span>
                </span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </HeroShell>
    </>
  );
}
