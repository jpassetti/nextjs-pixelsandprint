import React from "react";
import Iframe from "./Iframe";
import Paragraph from "./Paragraph";
import Container from "./Container";
import Section from "./Section";

import { getWorkshopDatesByYear } from "../lib/api"; // Import a function to get dates

interface AboutProps {
  year: number; // Year is passed as a prop
}

const About: React.FC<AboutProps> = ({ year }) => {
  // Fetch the corresponding workshop dates
  const dates = getWorkshopDatesByYear(year); // Example: "February 22-24, 2024"

  // Calculate the nth year (assuming the workshop started in 2015)
  const startYear = 2015;
  const nthYear = year - startYear + 1;

  return (
    <Section id="about">
      <Iframe
        aspectRatio="16x9"
        width={640}
        height={360}
        src="https://player.vimeo.com/video/891992135?h=2882ad0be1"
        title="Vimeo video player"
        platform="vimeo"
      />
      <Container type="content">
        <Paragraph marginBottom={2} color="white">
          Pixels & Print is a design workshop for the students in the graphic
          design program at{" "}
          <a href="https://www.syracuse.edu" target="_blank" rel="noopener noreferrer">
            Syracuse University’s
          </a>{" "}
          <a href="https://newhouse.syracuse.edu" target="_blank" rel="noopener noreferrer">
            S.I. Newhouse School of Public Communications
          </a>
          . It is a fully intensive workshop for the students who will work with
          industry professionals who come to help our students as art directors,
          leading the teams. The mission for this workshop is to have the design
          students see the power of design by designing for a deserving
          organization or business. This year the workshop is {dates}.
        </Paragraph>

        <Paragraph marginBottom={2} color="white">
          Over the course of the 48-hour workshop, approximately 40 students
          will design a logo and brand system, a website, promotional and social
          motion graphics, as well as printed book. To accomplish all of this,
          we divide students into teams, each with different design tasks to
          work on, and we pair them with a design coach or two to help art direct
          and guide the team to completion.
        </Paragraph>

        <Paragraph color="white">
          This is the {nthYear}
          {nthYear === 1 ? "st" : nthYear === 2 ? "nd" : nthYear === 3 ? "rd" : "th"} year for the
          Pixels & Print workshop created by the Visual Communications Department at the{" "}
          <a href="https://newhouse.syracuse.edu" target="_blank" rel="noopener noreferrer">
            Newhouse School
          </a>
          .
        </Paragraph>
      </Container>
    </Section>
  );
};

export default About;