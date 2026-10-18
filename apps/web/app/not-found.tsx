import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-[640px] flex-col items-start gap-4 px-5 py-24">
        <h1 className="font-display text-4xl font-extrabold">Esta página todavía no existe</h1>
        <p className="text-ink-2">Estamos armando Festeka. Mientras tanto, arma tu evento y te sugerimos proveedores.</p>
        <Link href="/arma-tu-evento" className="inline-flex min-h-12 items-center rounded-full bg-accent px-6 font-bold text-white">
          Arma tu evento
        </Link>
      </main>
    </>
  );
}
