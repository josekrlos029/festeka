import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/figtree";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://festeka.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Festeka · Proveedores para tu evento en Valledupar",
    template: "%s · Festeka",
  },
  description:
    "Decoración, inflables, catering, fotógrafos y más en Valledupar. Cuéntanos tu fiesta, te sugerimos a quién contratar y cotizas con todos en un solo envío.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Festeka",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B1530",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body className="min-h-screen bg-white text-ink">{children}</body>
    </html>
  );
}
