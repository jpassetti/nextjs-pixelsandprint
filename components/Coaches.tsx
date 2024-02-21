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
  year: number; // Assuming year is a number, adjust the type accordingly
}

const Coaches: React.FC<CoachesProps> = ({ year }) => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const coachesByYear = getCoachesByYear(year);
    coachesByYear.sort((a, b) => a.name.last.localeCompare(b.name.last));
    setCoaches(coachesByYear);
  }, [year]);
  
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
        <Grid>
          {coaches?.map((coach, index) => {
            return <CoachCard key={index} coach={coach} />
        })}
        </Grid>
      </Container>
    </Section>
  );
};
export default Coaches;
