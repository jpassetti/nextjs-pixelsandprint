import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./grid.module.scss";
import { motion } from "framer-motion";

const cx = classNames.bind(styles);

// Define a type for the component's props
interface GridProps {
 children: ReactNode; // ReactNode is used for typing anything that React can render
 maxColumns?: number;
}

const Grid: React.FC<GridProps> = ({ children, maxColumns }) => {
 const gridClasses = cx({
  grid: true,
  [`grid__columns__${maxColumns}`]: maxColumns,
 });
 const variants = {
  open: {
   transition: { staggerChildren: 0.05, delayChildren: 0.6 },
  },
  closed: {
   transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
 };

 return (
  <motion.div className={gridClasses} variants={variants}>
   {children}
  </motion.div>
 );
};

export default Grid;
