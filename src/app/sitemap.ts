import type { MetadataRoute } from "next";
import { SECTION_ROUTES, SITE_URL } from "@/data/routes";

/** Generate /sitemap.xml with the homepage and all public SecStudy section routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SECTION_ROUTES.map((route) => ({
      url: `${SITE_URL}/${route.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
  ];
}
