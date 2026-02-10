"use client";

import React from "react";
import Heading from "./Heading";
import CoachCard from "./CoachCard";
import Container from "./Container";
import Grid from "./Grid";
import Paragraph from "./Paragraph";
import Section from "./Section";

import type { Coach } from "@/lib/sanity.types";

interface CoachesProps {
 year?: number; // Optional for display text
 coaches?: Coach[];
}

const Coaches: React.FC<CoachesProps> = ({ year, coaches = [] }) => {
 const sortedCoaches = [...coaches].sort((a, b) => a.nameLast.localeCompare(b.nameLast));

 if (!year) {
  return null; // Don't render the component if the year is not provided
 }

 return (
  <Section id="coaches">
   <Heading
    level={2}
    textAlign="center"
    marginTop={8}
    marginBottom={2}
    color="white"
   >
    Coaches
   </Heading>
   <Container>
        {sortedCoaches.length > 0 ? (
     <Grid maxColumns={3}>
            {sortedCoaches.map((coach) => (
             <CoachCard
                key={coach._id}
                coach={{
                 name: { first: coach.nameFirst, last: coach.nameLast },
                 title: coach.title,
                 company: { name: coach.companyName, url: coach.companyUrl },
                 featuredImage: coach.headshot?.asset?.url
                    ? {
                         node: {
                            sourceUrl: coach.headshot.asset.url,
                            altText: coach.headshot.alt || `${coach.nameFirst} ${coach.nameLast}`,
                            mediaDetails: {
                             width: coach.headshot.asset.metadata?.dimensions?.width || 300,
                             height: coach.headshot.asset.metadata?.dimensions?.height || 300,
                            },
                         },
                        }
                    : undefined,
                  role: {
                   slug: coach.role,
                   name:
                    coach.role === "uiux"
                  ? "UI/UX"
                  : coach.role === "motion"
                   ? "Motion"
                   : coach.role === "print"
                    ? "Print"
                    : coach.role === "immersive"
                     ? "Immersive"
                     : coach.role,
                  },
                }}
             />
      ))}
     </Grid>
    ) : (
     <Paragraph textAlign="center" color="gray">
      Coach information for {year} is not yet available.
     </Paragraph>
    )}
   </Container>
  </Section>
 );
};

export default Coaches;
