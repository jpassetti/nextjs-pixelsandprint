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
import Link from "next/link";

import { sanityFetch } from "@/lib/sanity.client";
import { yearPageQuery } from "@/lib/sanity.queries";
import type { WorkshopYearPage } from "@/lib/sanity.types";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: { year: string } | Promise<{ year: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const yearSlug = resolvedParams.year;
  const yearNumber = Number.parseInt(yearSlug, 10);
  if (!Number.isFinite(yearNumber)) notFound();

  const data = await sanityFetch<WorkshopYearPage>(yearPageQuery, { year: yearSlug });
  if (!data?._id) notFound();

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
      {pageSections.map((section) => {
        // Default to enabled unless explicitly false
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
              />
            );

          case "coachesSection":
            return <Coaches key={section._key || section._type} year={yearNumber} coaches={data.coaches || []} />;

          case "sponsorsSection":
            return <Sponsors key={section._key || section._type} year={yearNumber} sponsors={data.sponsors || []} />;

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
            // For now we link to the timeline page. Inline mode can be implemented later.
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
                key={s._key || section._type}
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
    </Fragment>
  );
}

export const dynamic = "force-dynamic";
