import classnames from "classnames/bind";

import styles from "./svgtext.module.scss";

const cx = classnames.bind(styles);

const SVGtext = ({ path, isActive, isFocused, isHovered }) => {
    const svgTextClasses = cx({
        svgText: true,
        isFocused: isFocused,
        isHovered: isHovered,
        isActive: isActive,
    });

    return (
        <svg
            x="0px"
            y="0px"
            viewBox="0 0 700 106"
            // style={{ enableBackground: `new 0 0 700 106`}}
            xmlSpace="preserve"
        >
            <path className={svgTextClasses} d={path} />
        </svg>
    );
};
export default SVGtext;
//backgroundImage: "url(" + Background + ")"