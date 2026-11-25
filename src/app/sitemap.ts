import type { MetadataRoute } from "next";

/** Generate /sitemap.xml for search engine indexing of SecStudy. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://secstudy-free.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
