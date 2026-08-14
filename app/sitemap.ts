import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-metadata";

export const dynamic = "force-static";

const routes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/research", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teaching", changeFrequency: "yearly", priority: 0.7 },
  { path: "/cv", changeFrequency: "monthly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, SITE_URL).href,
    changeFrequency,
    priority,
  }));
}
