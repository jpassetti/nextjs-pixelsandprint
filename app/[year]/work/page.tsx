import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";

import { sanityFetch } from "@/lib/sanity.client";
import { workTimelineQuery } from "@/lib/sanity.queries";
import type { WorkItem } from "@/lib/sanity.types";
import { notFound } from "next/navigation";

export default async function WorkPage({
 params,
}: {
 params: { year: string } | Promise<{ year: string }>;
}) {
 const resolvedParams = await Promise.resolve(params);
 const yearSlug = resolvedParams.year;
 const yearNumber = Number.parseInt(yearSlug, 10);
 if (!Number.isFinite(yearNumber)) notFound();

 const items = await sanityFetch<WorkItem[]>(workTimelineQuery, { year: yearSlug });

 return (
  <Section id="work">
   <Container type="content">
    <Heading level={1} textAlign="center" color="white" marginTop={8} marginBottom={3}>
     {yearSlug} Work Timeline
    </Heading>

    {items.length === 0 ? (
     <Paragraph textAlign="center" color="white">
      No work has been published for {yearSlug} yet.
     </Paragraph>
    ) : (
     <div>
      {items.map((item) => (
       <div key={item._id} style={{ padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        <Heading level={3} color="white" marginBottom={1}>
         {item.title}
        </Heading>
        {(item.teamName || item.category || item.timelineDate) && (
         <Paragraph color="white" marginBottom={1}>
          {item.teamName ? `Team: ${item.teamName}` : ""}
          {item.teamName && (item.category || item.timelineDate) ? " • " : ""}
          {item.category ? `Category: ${item.category}` : ""}
          {item.category && item.timelineDate ? " • " : ""}
          {item.timelineDate ? new Date(item.timelineDate).toLocaleString() : ""}
         </Paragraph>
        )}
        {item.description && <Paragraph color="white">{item.description}</Paragraph>}
       </div>
      ))}
     </div>
    )}
   </Container>
  </Section>
 );
}

export const dynamic = "force-dynamic";
