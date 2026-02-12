import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity.client";
import { yearsListQuery } from "@/lib/sanity.queries";
import { absoluteUrl } from "@/lib/seo";

type YearListItem = {
 year: number;
 slug: string;
 workshopDatesLabel?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const years = await sanityFetch<YearListItem[]>(yearsListQuery);

 const now = new Date();
 const entries: MetadataRoute.Sitemap = [];

 // Root redirects to latest year, but keep it in the sitemap.
 entries.push({
  url: absoluteUrl("/"),
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.6,
 });

 for (const y of years || []) {
  const yearPath = `/${y.slug}`;
  entries.push({
   url: absoluteUrl(yearPath),
   lastModified: now,
   changeFrequency: "weekly",
   priority: 0.9,
  });

  // Register pages are typically thin / form embeds; include but low priority.
  entries.push({
   url: absoluteUrl(`${yearPath}/register`),
   lastModified: now,
   changeFrequency: "monthly",
   priority: 0.2,
  });

  entries.push({
   url: absoluteUrl(`${yearPath}/work`),
   lastModified: now,
   changeFrequency: "weekly",
   priority: 0.5,
  });
 }

 return entries;
}

export const revalidate = 3600;
