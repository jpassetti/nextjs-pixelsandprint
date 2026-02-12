"use client";

import React from "react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";

type RevealProps = {
 children: React.ReactNode;
} & Omit<MotionProps, "children">;

export default function Reveal({ children, ...motionProps }: RevealProps) {
 const reducedMotion = useReducedMotion();

 if (reducedMotion) {
  return <>{children}</>;
 }

 return (
  <motion.div
   initial="hidden"
   whileInView="show"
   viewport={{ once: true, amount: 0.2 }}
   variants={{
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
   }}
   {...motionProps}
  >
   {children}
  </motion.div>
 );
}
