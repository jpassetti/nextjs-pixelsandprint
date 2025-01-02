import ButtonWithLink from "./ButtonWithLink";
import ButtonGroup from "./ButtonGroup";
import Dashes from "./Dashes";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Section from "./Section";
import Span from "./Span";

import styles from "./overview.module.scss";

const Overview = ({ year }) => {
  return (
    <section className={styles.overview} id="overview">
      <Heading
        level={1}
        color="white"
        textTransform="uppercase"
        textAlign="center"
      >
        <Span size="small">A design workshop for</Span>
        <br />
        <Span gradient="orange">social impact.</Span>
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
        {year === "2024" ? `Feb. 22-24, 2024` : `Feb. 6-8, 2025`}
      </Heading>
      <Paragraph marginBottom={6} textAlign="center">
        Workshop is limited to students in the graphic design program at the
        Newhouse School.
      </Paragraph>

      <ButtonGroup justifyContent="center">
        <ButtonWithLink
          href={`${year}/register`}
          label="Register now"
         // type="primary"
          gradient="lightorange-to-orange"
        />
      </ButtonGroup>
    </section>
  );
};
export default Overview;
