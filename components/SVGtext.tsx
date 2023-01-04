import { Fragment } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import classnames from 'classnames/bind'

import styles from './svgtext.module.scss'

let cx = classnames.bind(styles)

const SVGtext = ({ path, slug, isActive, direction, isFocused, isHovered }) => {
    const svgTextClasses = cx({
        svgText: true,
        isFocused: isFocused,
        isHovered: isHovered,
        isActive: isActive,
    });
    return <svg 
    x="0px" y="0px"
    viewBox="0 0 575 106" 
    style={{ enableBackground: `new 0 0 575 106`}} 
    xmlSpace="preserve"
    >
        <path className={svgTextClasses} d={path} />
    </svg>
}
export default SVGtext;
//backgroundImage: "url(" + Background + ")"