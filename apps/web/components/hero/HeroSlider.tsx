"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { HERO_PHOTOS } from "@/lib/data";
import { Header } from "../Header";
import { SceneImage } from "../SceneImage";
import { TrackedLink } from "../TrackedLink";
import { HeroCopy } from "./HeroCopy";
import { HeroForm } from "./HeroForm";
import { HeroShell } from "./HeroShell";

const INTERVAL_MS = 5000;

function photoHref(p: (typeof HERO_PHOTOS)[number]) {
  const q = new URLSearchParams({ tipo: p.eventType, tematica: p.theme, desde: "foto" });
  return `/arma-tu-evento?${q.toString()}`;
}

/**
 * Variante B: slider a pantalla completa con el formulario encima.
 * Reglas de la prueba: se pausa con el cursor encima o con el foco en el formulario,
 * no rota si el usuario pidió reducir movimiento, y registra cada slide visto.
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const lastSource = useRef<"auto" | "manual">("auto");
  const slide = HERO_PHOTOS[index];
  const paused = userPaused || hoverPaused || reducedMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    track("hero_slide_view", { slide: index + 1, brand_id: slide.brandSlug, source: lastSource.current });
  }, [index, slide.brandSlug]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      lastSource.current = "auto";
      setIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  const go = (i: number, control: "flecha" | "punto") => {
    lastSource.current = "manual";
    track("hero_slider_nav", { control, to: i + 1 });
    setIndex((i + HERO_PHOTOS.length) % HERO_PHOTOS.length);
  };

  return (
    <HeroShell variant="b" className="relative flex min-h-[860px] flex-col overflow-hidden bg-ink text-white">
      <div
        className="absolute inset-0"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        aria-live="polite"
      >
        <SceneImage key={slide.id} palette={slide.palette} label={`Foto de ${slide.title}`} />
        <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
      </div>

      <Header overlay />

      <div
        className="relative mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center gap-5 px-5 py-10 sm:px-10"
        onFocusCapture={() => setHoverPaused(true)}
        onBlurCapture={() => setHoverPaused(false)}
      >
        <HeroCopy onDark />
        <div className="max-w-[960px]">
          <HeroForm tone="light" />
        </div>
        <TrackedLink href="/#categorias" event="hero_search_click" className="text-[15px] font-bold text-marigold hover:underline">
          O busca un proveedor puntual →
        </TrackedLink>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 pb-8 sm:px-10">
        <TrackedLink
          href={photoHref(slide)}
          event="hero_photo_click"
          props={{ photo_id: slide.id, brand_id: slide.brandSlug, position: index + 1, variant: "b" }}
          className="flex items-center gap-3 rounded-2xl bg-ink/75 px-4 py-2.5 text-white"
        >
          <span className="flex flex-col">
            <strong className="text-[15px]">{slide.title}</strong>
            <span className="text-[13px] text-on-night">{slide.credit}</span>
          </span>
          <span className="text-sm font-bold text-marigold">Cotiza con este equipo →</span>
        </TrackedLink>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => go(index - 1, "flecha")}
            className="h-11 w-11 rounded-full border border-white/50 bg-ink/50 text-lg"
          >
            ‹
          </button>
          <div className="flex gap-1.5">
            {HERO_PHOTOS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Ir a la foto ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i, "punto")}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-7 bg-marigold" : "w-2.5 bg-white/60"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={() => go(index + 1, "flecha")}
            className="h-11 w-11 rounded-full border border-white/50 bg-ink/50 text-lg"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => {
              track("hero_slider_nav", { control: "pausa", paused: !userPaused });
              setUserPaused((v) => !v);
            }}
            className="min-h-11 rounded-full border border-white/50 bg-ink/50 px-3.5 text-sm font-semibold"
          >
            {userPaused ? "Reproducir" : "Pausar"}
          </button>
        </div>
      </div>
    </HeroShell>
  );
}
