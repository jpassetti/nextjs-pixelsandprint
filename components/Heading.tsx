import React, { Fragment, ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './heading.module.scss';

const cx = classNames.bind(styles);

type Props = {
    children?: ReactNode,
	borderTop?: number,
	color?: string, 
	condensed?: boolean,
	fontFamily?: string,
	fontStyle?: string,
	fontWeight?: string,
	level: number, 
	letterSpacing?: string,
	lineHeight?: string,
	marginTop?: number, 
	marginBottom?: number, 
	marginLeft?: number, 
	marginRight?: number, 
	textAlign?: string, 
	textTransform?: string,
	size?: string,
}

const Heading = ({
	borderTop,
	children, 
	color="blue", 
	condensed,
	fontFamily = "primary",
	fontStyle = "normal",
	fontWeight = "bold",
	level, 
	letterSpacing,
	lineHeight = "normal",
	marginTop, 
	marginBottom, 
	marginLeft, 
	marginRight, 
	textAlign, 
	textTransform,
	size,
  }: Props) => {
	const headingClasses = cx({
		heading: true,
		[`h${level}`]: level,
		[`text-align-${textAlign}`] : textAlign,
		[`margin-top-${marginTop}`] : marginTop,
		[`margin-right-${marginRight}`]: marginRight,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`margin-left-${marginLeft}`]: marginLeft,
		[`border-top-${borderTop}`] : borderTop,
		[`text-transform-${textTransform}`] : textTransform,
		[`font-weight-${fontWeight}`] : fontWeight,
		[`font-color-${color}`] : color,
		[`font-style-${fontStyle}`] : fontStyle,
		[`line-height-${lineHeight}`] : lineHeight,
		[`font-family-${fontFamily}`] : fontFamily,
		[`font-size-${size}`] : size,
		[`letter-spacing-${letterSpacing}`] : letterSpacing,
		[`size-${size}`] : size,
		condensed : condensed,
	});
	const Tag = React.createElement(`h${level}`, { className: headingClasses }, children);
  
	return <Fragment>{Tag}</Fragment>
  }

export default Heading