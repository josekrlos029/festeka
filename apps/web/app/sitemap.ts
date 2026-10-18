import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://festeka.co";
  return [
    { url: `${site}/`, changeFrequency: "daily", priority: 1 },
    { url: `${site}/arma-tu-evento`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
