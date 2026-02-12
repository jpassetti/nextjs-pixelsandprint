import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./grid.module.scss";
import { motion } from "framer-motion";

const cx = classNames.bind(styles);

type MotionDivProps = React.ComponentProps<typeof motion.div>;

// Define a type for the component's props
interface GridProps
 extends Omit<MotionDivProps, "children" | "className"> {
 children: ReactNode; // ReactNode is used for typing anything that React can render
 maxColumns?: number;
 mobileColumns?: number;
 xs?: number;
 sm?: number;
 md?: number;
 lg?: number;
 xl?: number;
 lx?: number;
 className?: string;
}

const Grid: React.FC<GridProps> = ({
 children,
 maxColumns,
 mobileColumns,
 xs,
 sm,
 md,
 lg,
 xl,
 lx,
 className,
 ...motionProps
}) => {
 const resolvedXl = xl ?? lx;

 const gridClasses = cx({
  grid: true,
  [`grid__columns__${maxColumns}`]: maxColumns,
    [`grid__mobile__${mobileColumns}`]: mobileColumns,
  [`grid__xs__${xs}`]: xs,
  [`grid__sm__${sm}`]: sm,
  [`grid__md__${md}`]: md,
  [`grid__lg__${lg}`]: lg,
  [`grid__xl__${resolvedXl}`]: resolvedXl,
 });

 const combinedClassName = [gridClasses, className].filter(Boolean).join(" ");

 return (
  <motion.div className={combinedClassName} {...motionProps}>
   {children}
  </motion.div>
 );
};

export default Grid;
