import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SecStudyWorkspace } from "@/components/SecStudyWorkspace";
import { SECTION_ROUTES, SITE_URL, getSectionBySlug } from "@/data/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTION_ROUTES.map((route) => ({
    section: route.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const route = getSectionBySlug(section);
  if (!route) return {};

  const canonicalPath = `/${route.slug}`;

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: "SecStudy",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
    },
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const route = getSectionBySlug(section);
  if (!route) {
    notFound();
  }

  return <SecStudyWorkspace initialNav={route.nav} />;
}
