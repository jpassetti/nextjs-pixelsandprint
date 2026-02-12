import ButtonWithLink from "./ButtonWithLink";
import ButtonGroup from "./ButtonGroup";
import Dashes from "./Dashes";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Span from "./Span";
import Reveal from "./Reveal";

import styles from "./overview.module.scss";

const Overview = ({
  year,
  datesLabel,
  registrationPath,
  kicker,
  highlight,
  body,
  ctaLabel,
  ctaEnabled = true,
}) => {
  return (
    <section className={styles.overview} id="overview">
      <Reveal>
      <Heading
        level={1}
        color="white"
        textTransform="uppercase"
        textAlign="center"
      >
        <Span size="small">{kicker || "A design workshop for"}</Span>
        <br />
        <Span gradient="orange">{highlight || "social impact."}</Span>
      </Heading>
      <Dashes />
      <Heading
        level={3}
        color="white"
        textTransform="uppercase"
        textAlign="center"
        marginBottom={4}
        condensed
      >
        {datesLabel || "Dates to be announced"}
      </Heading>
      <Paragraph marginBottom={6} textAlign="center">
        {body ||
          "Workshop is limited to students in the graphic design program at the Newhouse School."}
      </Paragraph>

      {ctaEnabled !== false && (
        <ButtonGroup justifyContent="center">
          <ButtonWithLink
            href={registrationPath || `/${year}/register`}
            label={ctaLabel || "Register now"}
            // type="primary"
            gradient="lightorange-to-orange"
          />
        </ButtonGroup>
      )}
      </Reveal>
    </section>
  );
};
export default Overview;
