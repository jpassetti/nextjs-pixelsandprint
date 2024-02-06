import Container from "@/components/Container";
import Nav from "@/components/Nav";

import styles from "./stickynav.module.scss";

import { getSections } from "@/lib/api";

const StickyNav = () => {
  const sections = getSections();

  return (
    <div className={styles.stickynav}>
      <Container>
        <Nav items={sections} />
      </Container>
    </div>
  );
};

export default StickyNav;
