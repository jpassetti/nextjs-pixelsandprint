import React, { ReactNode } from "react";
import styles from "./section.module.scss";

// Define a type for the component's props
interface SectionProps {
  children: ReactNode; // ReactNode is used for typing anything that React can render
  id?: string; // The '?' makes the 'id' prop optional
}

const Section = ({ children, id }: SectionProps) => {
  return <section id={id} className={styles.section}>
      {children}
  </section>
};

export default Section;