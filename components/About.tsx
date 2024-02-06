import Iframe from "./Iframe";
import Paragraph from "./Paragraph";
import Container from "./Container";
import Section from "./Section";

const About = () => {
  return (
    <Section id="about">
      <Iframe
        aspectRatio="16x9"
        width={640}
        height={360}
        src="https://player.vimeo.com/video/891992135?h=2882ad0be1"
        title="YouTube video player"
        platform="vimeo"
      />
      <Container type="content">
        <Paragraph marginBottom={2} color="white">
          Pixels & Print is a design workshop for the students in the graphic
          design program at{" "}
          <a href="https://www.syracuse.edu" target="_blank">
            Syracuse University’s
          </a>{" "}
          <a href="https://newhouse.syracuse.edu" target="_blank">
            S.I. Newhouse School of Public Communications
          </a>
          . It is a fully intensive workshop for the students who will work with
          industry professionals who come to help our students as art directors,
          leading the teams. The mission for this workshop is to have the design
          students see the power of design by designing for a deserving
          organization or business. This year the workshop is February 22-24,
          2024.
        </Paragraph>

        <Paragraph marginBottom={2} color="white">
          Over the course of the 48-hour workshop, approximately 40 students
          will design a logo and brand system, a website, promotional and social
          motion graphics, as well as printed book. To accomplish all of this,
          we divide students into teams, each with different design tasks to
          work on, and we pair them a design coach or two to help art direct and
          guide the team to completion.
        </Paragraph>

        <Paragraph color="white">
          This is the 10th year for the Pixels & Print workshop created by the
          Visual Communications Department at the{" "}
          <a href="https://newhouse.syracuse.edu" target="_blank">
            Newhouse School
          </a>
          .
        </Paragraph>
      </Container>
    </Section>
  );
};
export default About;
