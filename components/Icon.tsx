import React from "react";

// Define the shape of an individual icon object
interface IconDefinition {
  name: string;
  width: number;
  height: number;
  path: string;
}

// Props type definition
interface IconProps {
  icon: string;
  width?: number;
  color?: string;
}

const icons: IconDefinition[] = [
  {
    name: "plus",
    width: 448,
    height: 512,
    path: `M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z`,
  },
  {
    name: "chevron-right",
    width: 320,
    height: 512,
    path: `M96,480c-8.2,0-16.4-3.1-22.6-9.4c-12.5-12.5-12.5-32.8,0-45.2L242.8,256L73.4,86.6
            c-12.5-12.5-12.5-32.8,0-45.2s32.8-12.5,45.2,0l192,192c12.5,12.5,12.5,32.8,0,45.2l-192,192C112.4,476.9,104.2,480,96,480z`,
  },
  {
    name: "chevron-left",
    width: 320,
    height: 512,
    path: `M224,480c-8.2,0-16.4-3.1-22.6-9.4l-192-192c-12.5-12.5-12.5-32.8,0-45.2l192-192c12.5-12.5,32.8-12.5,45.2,0
            s12.5,32.8,0,45.2L77.2,256l169.4,169.4c12.5,12.5,12.5,32.8,0,45.2C240.4,476.9,232.2,480,224,480z`,
  },
  // Add more icons as needed
];

const Icon: React.FC<IconProps> = ({ icon, width, color }) => {
  const matchingIcon = icons.find((i) => i.name === icon);

  if (!matchingIcon) {
    return null; // or some fallback
  }

  const { width: defaultWidth, height, path } = matchingIcon;

  return (
    <svg
      viewBox={`0 0 ${defaultWidth} ${height}`}
      width={width || defaultWidth}
      fill={color || "currentColor"} // Default color handling
    >
      <path d={path} />
    </svg>
  );
};

export default Icon;
