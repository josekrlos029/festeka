"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Bandeja flotante "Mi evento". Aparece cuando el visitante ya pasó el hero,
 * para no tapar el formulario ni los controles del slider (y no contaminar el A/B).
 * Sprint 7: mostrar los proveedores ya elegidos (estado guardado del plan).
 */
export function EventTray() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/arma-tu-evento"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed inset-x-3 bottom-3 z-50 flex items-center justify-between gap-3.5 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-white shadow-[0_12px_32px_rgba(27,21,48,0.3)] transition-all duration-300 sm:inset-x-auto sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="flex flex-col leading-tight">
        <span className="text-xs font-semibold text-[#C9C3DA]">Mi evento</span>
        <span className="text-[15px] font-bold">Arma tu evento gratis</span>
      </span>
      <span className="inline-flex min-h-10 items-center rounded-full bg-marigold px-4 text-sm font-extrabold text-ink">Empezar</span>
    </Link>
  );
}
