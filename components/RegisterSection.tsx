import React from "react";

import Container from "./Container";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Section from "./Section";
import Reveal from "./Reveal";

type RegisterSectionProps = {
  title?: string;
  formUrl?: string;
  height?: number;
};

export default function RegisterSection({
  title = "Register",
  formUrl,
  height = 1800,
}: RegisterSectionProps) {
  if (!formUrl) {
    return (
      <Section id="register">
        <Reveal>
          <Container type="content">
            <Heading level={2} textAlign="center" marginTop={8} marginBottom={2} color="white">
              {title}
            </Heading>
            <Paragraph textAlign="center" color="white">
              Registration is not available yet.
            </Paragraph>
          </Container>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section id="register">
      <Reveal>
        <Heading level={2} textAlign="center" marginTop={8} marginBottom={2} color="white">
          {title}
        </Heading>

        <Container type="content">
          <iframe
            src={formUrl}
            width="100%"
            height={height}
            style={{ border: 0 }}
            loading="lazy"
            title="Registration form"
          >
            Loading…
          </iframe>
        </Container>
      </Reveal>
    </Section>
  );
}
