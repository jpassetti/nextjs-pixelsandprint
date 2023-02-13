import { motion } from 'framer-motion';

import Image from "next/image";
import { getSponsors } from "../lib/api";
import Grid from './Grid'
import Heading from "./Heading";
import Section from "./Section";

import styles from './sponsors.module.scss'

const Sponsors = () => {
    const sponsors = getSponsors();
    
    const variants = {
        open: {
          y: 0,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 }
          }
        },
        closed: {
          y: 35,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 }
          }
        }
      };

    return <Section>
        <Grid>
            {sponsors.map((sponsor, index) => {
                const { name, url, featuredImage } = sponsor;
                return <motion.div className={styles.sponsor} key={index} variants={variants}>
                    <a href={url}>
                    <Image 
                        src={featuredImage.node.sourceUrl}
                        alt={featuredImage.node.altText}
                        width={featuredImage.node.mediaDetails.width}
                        height={featuredImage.node.mediaDetails.height}
                        className={styles.sponsorImage}
                    />
                    </a>
                    <Heading level={4} color="white" marginTop={1}>{name}</Heading>
            </motion.div>
            })}
        </Grid>
       </Section>
};

export default Sponsors;