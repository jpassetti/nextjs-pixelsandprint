import { ReactNode } from "react";

import classNames from "classnames/bind";
import styles from "./container.module.scss";

let cx = classNames.bind(styles);

type Props = {
  children?: ReactNode;
  type?: string;
};

const Container = ({ children, type }: Props) => {
  let containerClasses = cx({
    container: true,
    [`content`]: type === "content",
  });
  return <div className={containerClasses}>{children}</div>;
};
export default Container;
