import React from "react";

import Container from "./Container";
import Heading from "./Heading";
import Section from "./Section";
import PortableTextContent from "./PortableTextContent";
import Reveal from "./Reveal";

interface CustomSectionProps {
  id?: string;
  title?: string;
  body?: unknown;
}

const CustomSection: React.FC<CustomSectionProps> = ({ id, title, body }) => {
  return (
    <Section id={id}>
      <Reveal>
        <Container type="content">
          {title ? (
            <Heading level={2} textAlign="center" marginTop={8} marginBottom={2} color="white">
              {title}
            </Heading>
          ) : null}
          <PortableTextContent value={body} />
        </Container>
      </Reveal>
    </Section>
  );
};

export default CustomSection;
