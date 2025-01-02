import React from "react";
import Container from "./Container";
import styles from "./footer.module.scss";
import Paragraph from "./Paragraph";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className={styles.footer}>
      <Container>
        <Paragraph>
          Copyright {currentYear}{" "}
          <a
            style={{ color: "white" }}
            href="https://newhouse.syr.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newhouse School
          </a>{" "}
          at{" "}
          <a
            style={{ color: "white" }}
            href="https://www.syracuse.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Syracuse University
          </a>
          .
        </Paragraph>
      </Container>
    </footer>
  );
};

export default Footer;