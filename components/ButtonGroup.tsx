import React, { ReactNode } from "react";
import classnames from "classnames/bind";
import styles from "./buttongroup.module.scss";

const cx = classnames.bind(styles);

// Define a type for the component's props
interface ButtonGroupProps {
  children: ReactNode; // ReactNode is used for typing anything that React can render
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"; // Assuming these are your possible values
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  justifyContent,
}) => {
  const buttonGroupClasses = cx({
    button_group: true,
    [`justify-content-${justifyContent}`]: justifyContent,
  });

  return <div className={buttonGroupClasses}>{children}</div>;
};

export default ButtonGroup;
