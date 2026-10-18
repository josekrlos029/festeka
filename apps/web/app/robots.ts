import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://festeka.co";
  // Mientras sea demo con datos dummy, no se indexa. Quitar en el lanzamiento (sprint 8).
  const isDemo = process.env.NEXT_PUBLIC_DEMO !== "false";
  return {
    rules: isDemo ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: ["/h/", "/api/"] },
    sitemap: `${site}/sitemap.xml`,
  };
}
