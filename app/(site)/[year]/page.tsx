import { Fragment } from "react";

import Overview from "@/components/Overview";
import About from "@/components/About";
import Coaches from "@/components/Coaches";
import Schedule from "@/components/Schedule";
import Sponsors from "@/components/Sponsors";
import RegisterSection from "@/components/RegisterSection";
import CustomSection from "@/components/CustomSection";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import Container from "@/components/Container";
import BackToTopLink from "@/components/BackToTopLink";
import Link from "next/link";

import styles from "./page.module.scss";

import { sanityFetch } from "@/lib/sanity.client";
import { yearPageQuery } from "@/lib/sanity.queries";
import type { WorkshopYearPage } from "@/lib/sanity.types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

function buildYearTitle(yearSlug: string) {
 return `Pixels & Print ${yearSlug} | Newhouse School at Syracuse University`;
}

function buildYearDescription(data: WorkshopYearPage, yearSlug: string) {
 return (
  data.welcomeBody ||
  data.workshopDatesLabel ||
  data.overviewDatesLabel ||
  `Pixels & Print ${yearSlug} is a design workshop for social impact at the S.I. Newhouse School of Public Communications.`
 );
}

function buildWorkshopJsonLd(data: WorkshopYearPage, yearSlug: string) {
 const sortedDays = [...(data.scheduleDays || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

 const events = (data.scheduleEvents || [])
  .filter((e) => Boolean(e?.title) && Boolean(e?.start))
  .map((e) => {
   const locationName =
    (typeof e.location === "object" && e.location?.name) ||
    (typeof e.location === "object" && e.location?.slug) ||
    e.locationSlug ||
    undefined;

   return {
    "@type": "Event",
    name: e.title,
    startDate: e.start,
    ...(e.end ? { endDate: e.end } : {}),
    ...(locationName
     ? {
        location: {
         "@type": "Place",
         name: locationName,
        },
       }
     : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: absoluteUrl(`/${yearSlug}`),
   };
  });

 return {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `Pixels & Print ${yearSlug}`,
  url: absoluteUrl(`/${yearSlug}`),
  description: buildYearDescription(data, yearSlug),
  ...(sortedDays?.[0]?.start ? { startDate: sortedDays[0].start } : {}),
  ...(sortedDays?.[sortedDays.length - 1]?.end
   ? { endDate: sortedDays[sortedDays.length - 1].end }
   : {}),
  organizer: {
   "@type": "Organization",
   name: "S.I. Newhouse School of Public Communications",
   url: "https://newhouse.syracuse.edu",
  },
  ...(events.length
   ? {
      subEvent: events,
     }
   : {}),
 };
}

export async function generateMetadata({
 params,
}: {
 params: { year: string } | Promise<{ year: string }>;
}): Promise<Metadata> {
 const resolvedParams = await Promise.resolve(params);
 const yearSlug = resolvedParams.year;

 const data = await sanityFetch<WorkshopYearPage>(yearPageQuery, {
  year: yearSlug,
 });

 if (!data?._id) {
  return {
   title: "Pixels & Print",
   robots: { index: false, follow: false },
  };
 }

 const title = buildYearTitle(yearSlug);
 const description = buildYearDescription(data, yearSlug);
 const canonical = absoluteUrl(`/${yearSlug}`);
 const siteUrl = getSiteUrl();

 return {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical },
  openGraph: {
   type: "website",
   url: canonical,
   title,
   description,
   siteName: "Pixels & Print",
    images: [
     {
      url: "/pixels-and-print-og-1200x630px.jpg",
      width: 1200,
      height: 630,
      alt: "Pixels & Print",
     },
    ],
  },
  twitter: {
    card: "summary_large_image",
   title,
   description,
    images: ["/pixels-and-print-og-1200x630px.jpg"],
  },
 };
}

export default async function Home({
 params,
}: {
 params: { year: string } | Promise<{ year: string }>;
}) {
 const resolvedParams = await Promise.resolve(params);
 const yearSlug = resolvedParams.year;
 const yearNumber = Number.parseInt(yearSlug, 10);
 if (!Number.isFinite(yearNumber)) notFound();

 const data = await sanityFetch<WorkshopYearPage>(yearPageQuery, {
  year: yearSlug,
 });
 if (!data?._id) notFound();

 const jsonLd = buildWorkshopJsonLd(data, yearSlug);

 const pageSections =
  data.pageSections && data.pageSections.length > 0
   ? data.pageSections
   : [
     { _type: "welcomeSection", enabled: true },
     { _type: "aboutSection", enabled: true },
     { _type: "scheduleSection", enabled: true },
     { _type: "coachesSection", enabled: true },
     { _type: "sponsorsSection", enabled: true },
    ];

 return (
  <Fragment>
   <script
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
   />
   {pageSections.map((section) => {
    const enabled = (section as { enabled?: boolean }).enabled !== false;
    if (!enabled) return null;

    switch (section._type) {
     case "welcomeSection":
      return (
       <Overview
        key={section._key || section._type}
        year={yearSlug}
        datesLabel={data.overviewDatesLabel || data.workshopDatesLabel}
        registrationPath={`/${yearSlug}/register`}
        kicker={data.welcomeKicker}
        highlight={data.welcomeHighlight}
        body={data.welcomeBody}
        ctaLabel={data.welcomeCtaLabel}
        ctaEnabled={data.welcomeCtaEnabled}
       />
      );

     case "aboutSection":
      return (
       <About
        key={section._key || section._type}
        year={yearNumber}
        workshopDatesLabel={data.workshopDatesLabel}
        videoUrl={data.aboutVideoUrl}
        aboutBody={data.aboutBody}
       />
      );

     case "scheduleSection":
      return (
       <Schedule
        key={section._key || section._type}
        days={data.scheduleDays || []}
        events={data.scheduleEvents || []}
      updatedAt={data._updatedAt}
       />
      );

     case "coachesSection":
      return (
       <Coaches
        key={section._key || section._type}
        year={yearNumber}
        coaches={data.coaches || []}
       />
      );

     case "sponsorsSection":
      return (
       <Sponsors
        key={section._key || section._type}
        year={yearNumber}
        sponsors={data.sponsors || []}
       />
      );

     case "registerSection": {
      const s = section as {
       _key?: string;
       title?: string;
       formUrl?: string;
       height?: number;
      };
      return (
       <RegisterSection
        key={s._key || section._type}
        title={s.title || "Register"}
        formUrl={s.formUrl || data.registrationFormUrl}
        height={typeof s.height === "number" ? s.height : 1800}
       />
      );
     }

     case "timelineSection": {
      const s = section as { _key?: string; linkLabel?: string; mode?: string };
      return (
       <Section key={s._key || section._type} id="timeline">
        <Container type="content">
         <Heading level={2} textAlign="center" marginTop={8} marginBottom={2} color="white">
          Timeline
         </Heading>
         <Paragraph textAlign="center" color="white">
          <Link href={`/${yearSlug}/work`} style={{ color: "#f76900" }}>
           {s.linkLabel || "View the work timeline"}
          </Link>
         </Paragraph>
        </Container>
       </Section>
      );
     }

     case "customSection": {
      const s = section as { _key?: string; title?: string; body?: unknown };
      return (
       <CustomSection
        key={section._key || section._type}
        id={s._key ? `custom-${s._key}` : undefined}
        title={s.title}
        body={s.body}
       />
      );
     }

     default:
      return null;
    }
   })}

   <Section id="back-to-top">
    <Container type="content">
     <Paragraph textAlign="center" color="white">
    <BackToTopLink className={styles.backToTopLink} />
     </Paragraph>
    </Container>
   </Section>
  </Fragment>
 );
}

export const dynamic = "force-dynamic";
