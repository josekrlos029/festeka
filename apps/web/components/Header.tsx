import Link from "next/link";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

export function Header({ overlay = false }: { overlay?: boolean }) {
  const linkColor = overlay ? "text-white" : "text-ink";
  return (
    <header
      className={`relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-4 sm:px-10 ${
        overlay ? "" : "border-b border-line bg-white"
      }`}
    >
      <Link href="/" aria-label="Festeka, inicio">
        <Logo dark={overlay} />
      </Link>
      <nav aria-label="Principal" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-semibold">
        <Link href="/#categorias" className={`${linkColor} hidden hover:underline sm:inline`}>
          Explorar
        </Link>
        <Link href="/#inspiracion" className={`${linkColor} hidden hover:underline sm:inline`}>
          Ideas
        </Link>
        <Link href="/#proveedores" className={`${linkColor} hidden hover:underline md:inline`}>
          Soy proveedor
        </Link>
        <TrackedLink
          href="/arma-tu-evento"
          event="hero_cta_click"
          props={{ button: "arma_tu_evento_header" }}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 font-bold text-white hover:bg-accent-strong"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
          </svg>
          Arma tu evento
        </TrackedLink>
      </nav>
    </header>
  );
}
