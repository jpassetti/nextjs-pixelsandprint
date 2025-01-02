"use client";

import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import CoachCard from "./CoachCard";
import Container from "./Container";
import Grid from "./Grid";
import Paragraph from "./Paragraph";
import Section from "./Section";

import { getCoachesByYear } from "../lib/api";

interface CoachesProps {
  year?: number; // Make year optional
}

const Coaches: React.FC<CoachesProps> = ({ year }) => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    if (year) {
      const coachesByYear = getCoachesByYear(year);
      coachesByYear.sort((a, b) => a.name.last.localeCompare(b.name.last));
      setCoaches(coachesByYear);
    }
  }, [year]);

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
      <Container type="content">
        {coaches.length > 0 ? (
          <Grid>
            {coaches.map((coach, index) => (
              <CoachCard key={index} coach={coach} />
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