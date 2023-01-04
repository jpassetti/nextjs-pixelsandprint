import { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './heading.module.scss';

let cx = classNames.bind(styles);

type Props = {
    children?: ReactNode,
	borderTop?: number,
	className?: string,
	color?: string, 
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
	className,
	color="blue", 
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
	const Tag = level > 6 ? 'h6' : `h${level}`

	let headingClasses = cx({
		heading: true,
		[`${Tag}`]: level,
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
		[`size-${size}`] : size

	});

	return <Tag className={`${headingClasses} ${className}`}>{children}</Tag>
}
export default Heading