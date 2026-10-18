import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Home } from "@/components/home/Home";
import { HERO_VARIANTS, isHeroVariant } from "@/lib/experiments";

/**
 * Variantes estáticas de la Home para el A/B del hero.
 * El visitante nunca ve esta URL: proxy.ts reescribe "/" hacia aquí.
 * noindex + canonical a "/" para que Google solo indexe la Home.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return HERO_VARIANTS.map((variant) => ({ variant }));
}

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default async function VariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!isHeroVariant(variant)) notFound();
  return <Home variant={variant} />;
}
