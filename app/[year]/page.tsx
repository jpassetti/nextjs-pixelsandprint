import { Fragment } from "react";

import Overview from "@/components/Overview";
import About from "@/components/About";
import Coaches from "@/components/Coaches";
import Container from "@/components/Container";
import Schedule from "@/components/Schedule";
import Sponsors from "@/components/Sponsors";

export default function Home({ params }) {

  // get year from the path [year]
  const year = params.year;

  return (
    <Fragment>
      <Overview />
      <Container>
        <About />
        <Schedule />
        <Coaches year={year} />
        <Sponsors />
      </Container>
    </Fragment>
  );
}
