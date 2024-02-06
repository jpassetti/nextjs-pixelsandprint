import React, { ReactNode } from "react";
import classnames from "classnames/bind";
import styles from "./frame.module.scss";

let cx = classnames.bind(styles);

// Define a type for the component's props
interface FrameProps {
  children: ReactNode; // ReactNode is used for typing anything that React can render
  color?: "white"; // Specify more color options as needed
}

const Frame: React.FC<FrameProps> = ({ children, color }) => {
  let frameClasses = cx({
    frame: true,
    white: color === "white",
    // Add more color conditions here if needed
  });

  return <div className={frameClasses}>{children}</div>;
};

export default Frame;
