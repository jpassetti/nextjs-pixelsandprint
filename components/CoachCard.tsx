import { motion } from "framer-motion";
import Heading from "./Heading";
import Image from "next/image";
import Paragraph from "./Paragraph";
import classnames from "classnames/bind";
import styles from "./coachcard.module.scss";

const cx = classnames.bind(styles);

// Define the types for the coach's properties
interface Coach {
  name: {
    first: string;
    last: string;
  };
  title?: string;
  company: {
    name: string;
    url: string;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  role: {
    slug: string;
    name: string;
  };
}

interface CoachCardProps {
  coach: Coach;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach }) => {
  const { name, title, company, featuredImage, role } = coach;
  const roleClasses = cx({
    coachcard__role: true,
    [`gradient-lightorange-to-orange`]: role.slug === "uiux",
    [`gradient-mediumorange-to-darkorange`]: role.slug === "motion",
    [`gradient-lightblue-to-mediumblue`]: role.slug === "print",
    [`gradient-lightviolet-to-violet`]: role.slug === "immersive",

  });

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
    <motion.div className={styles.coachcard} variants={variants}>
      {featuredImage && (
        <a
          style={{ textDecoration: "none", color: "inherit" }}
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText}
            width={featuredImage.node.mediaDetails.width}
            height={featuredImage.node.mediaDetails.height}
            sizes="(max-width: 699px) 100vw, (max-width: 979px) 100vw, (max-width: 1139px) 50vw, 33vw"
            className={styles.coachcard__image}
          />
        </a>
      )}
      <div className={styles.coachcard__content}>
        <Heading level={3} size="small" marginBottom={1}>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name.first} {name.last}
          </a>
        </Heading>
        {title && <Paragraph marginBottom={1}>{title}</Paragraph>}
        {company && (
          <Paragraph caps condensed>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.name}
            </a>
          </Paragraph>
        )}
      </div>
      <div className={roleClasses}>{role.name}</div>
    </motion.div>
  );
};

export default CoachCard;
