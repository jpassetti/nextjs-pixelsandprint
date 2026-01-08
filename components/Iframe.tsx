import React from "react";
import classNames from "classnames/bind";
import styles from "./iframe.module.scss";

const cx = classNames.bind(styles);

// Define a type for the component's props
interface IframeProps {
  aspectRatio?: "16x9" | "4x3"; // Adjust based on your supported aspect ratios
  height?: number; // Assuming height and width can be any valid CSS value
  platform?: string; // Optional metadata; currently unused in rendering
  src: string;
  title: string;
  width?: number;
}

const Iframe: React.FC<IframeProps> = ({
  aspectRatio,
  height,
  src,
  title,
  width,
}) => {
  const embedClasses = cx({
    embedResponsive: true,
    [`embedResponsive${aspectRatio}`]: aspectRatio,
  });

  return (
    <div className={embedClasses}>
      <iframe
        src={src}
        title={title}
        width={width}
        height={height}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Iframe;
