import { permanentRedirect } from "next/navigation";

import { sanityFetch } from "@/lib/sanity.client";
import { yearsListQuery } from "@/lib/sanity.queries";

type YearListItem = {
 year: number;
 slug: string;
 workshopDatesLabel?: string;
};

export default async function Page() {
 const years = await sanityFetch<YearListItem[]>(yearsListQuery);
 const latest = years?.[0]?.slug;

 if (latest) {
  permanentRedirect(`/${latest}`);
 }

 return null;
}

export const dynamic = "force-dynamic";