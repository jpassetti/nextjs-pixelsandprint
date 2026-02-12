"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Grid from "./Grid";
import Heading from "./Heading";
import Section from "./Section";
import Paragraph from "./Paragraph"; // Assuming Paragraph is a component for styled text

import type { Sponsor } from "@/lib/sanity.types";

import styles from "./sponsors.module.scss";
import Container from "./Container";

// Define the props interface
interface SponsorsProps {
 year: number;
 sponsors?: Sponsor[];
}

const Sponsors: React.FC<SponsorsProps> = ({ year, sponsors = [] }) => {

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
   <Container>
    {sponsors.length > 0 ? (
    <Grid maxColumns={4}>
     {sponsors.map((sponsor) => {
        const { name, url, logo } = sponsor;
        const logoUrl = logo?.asset?.url;
        const width = logo?.asset?.metadata?.dimensions?.width;
        const height = logo?.asset?.metadata?.dimensions?.height;
      return (
       <motion.div className={styles.sponsor} key={sponsor._id} variants={variants}>
        <div>
            {logoUrl ? (
             <a href={url || "#"} target={url ? "_blank" : undefined} rel={url ? "noopener noreferrer" : undefined}>
              <Image
                src={logoUrl}
                alt={logo?.alt || name}
                width={width || 300}
                height={height || 150}
                className={styles.sponsorImage}
              />
             </a>
            ) : (
             <Paragraph textAlign="center" color="white">
              {name}
             </Paragraph>
            )}
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
    </Container>
  </Section>
 );
};

export default Sponsors;
