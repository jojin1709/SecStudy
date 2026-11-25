import type { MetadataRoute } from "next";

/** Generate /robots.txt allowing search engine crawling and declaring sitemap.xml. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://secstudy-free.vercel.app/sitemap.xml",
    host: "https://secstudy-free.vercel.app",
  };
}
