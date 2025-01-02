"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getSponsorsByYear } from "../lib/api";
import Grid from "./Grid";
import Heading from "./Heading";
import Section from "./Section";
import Paragraph from "./Paragraph"; // Assuming Paragraph is a component for styled text

import styles from "./sponsors.module.scss";

// Define the props interface
interface SponsorsProps {
  year: number; // Ensure the year is explicitly typed as a number
}

const Sponsors: React.FC<SponsorsProps> = ({ year }) => {
  const sponsors = getSponsorsByYear(year);

  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 35,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <Section id="sponsors">
      <Heading
        level={2}
        textAlign="center"
        marginTop={8}
        marginBottom={2}
        color="white"
      >
        Sponsors
      </Heading>
      {sponsors.length > 0 ? (
        <Grid>
          {sponsors.map((sponsor, index) => {
            const { name, url, featuredImage } = sponsor;
            return (
              <motion.div
                className={styles.sponsor}
                key={index}
                variants={variants}
              >
                <div>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={featuredImage.node.sourceUrl}
                      alt={featuredImage.node.altText}
                      width={featuredImage.node.mediaDetails.width}
                      height={featuredImage.node.mediaDetails.height}
                      className={styles.sponsorImage}
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </Grid>
      ) : (
        <Paragraph textAlign="center" color="white">
          Sponsor information for {year} is not yet available.
        </Paragraph>
      )}
    </Section>
  );
};

export default Sponsors;