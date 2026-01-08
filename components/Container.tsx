import { ReactNode } from "react";

import classNames from "classnames/bind";
import styles from "./container.module.scss";

const cx = classNames.bind(styles);

type Props = {
  children?: ReactNode;
  type?: string;
};

const Container = ({ children, type }: Props) => {
  const containerClasses = cx({
    container: true,
    [`content`]: type === "content",
  });
  return <div className={containerClasses}>{children}</div>;
};
export default Container;
