import { motion } from 'framer-motion';

import Heading from './Heading'
import Image from 'next/image'
import Paragraph from './Paragraph'

import classnames from 'classnames/bind'

import styles from './coachcard.module.scss'

let cx = classnames.bind(styles)

const CoachCard = ({ coach }) => {
    const { name, title, company, featuredImage, role } = coach;
    let roleClasses = cx({
        coachcard__role: true,
        [`coachcard__role--${role.toLowerCase()}`]: role
    });

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

    return <motion.div className={styles.coachcard} variants={variants}>
        <Image 
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText}
            width={featuredImage.node.mediaDetails.width}
            height={featuredImage.node.mediaDetails.height}
            className={styles.coachcard__image}
        />
        <div className={styles.coachcard__content}>
            <Heading level={3} size="small">{name}</Heading>
            <Paragraph>{title}</Paragraph>
            <Paragraph><a href={company.url} target="_blank">{company.name}</a></Paragraph>
        </div>
        <div className={roleClasses}>
            {role}
        </div>
    </motion.div>
}
export default CoachCard