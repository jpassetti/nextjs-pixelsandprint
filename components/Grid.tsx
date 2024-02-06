import React, { ReactNode } from "react";
import styles from "./grid.module.scss";
import { motion } from "framer-motion";

// Define a type for the component's props
interface GridProps {
  children: ReactNode; // ReactNode is used for typing anything that React can render
}

const Grid: React.FC<GridProps> = ({ children }) => {
  const variants = {
    open: {
      transition: { staggerChildren: 0.05, delayChildren: 0.6 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <motion.div className={styles.grid} variants={variants}>
      {children}
    </motion.div>
  );
};

export default Grid;
