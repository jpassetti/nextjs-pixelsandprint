import { ReactNode } from 'react'
import classnames from 'classnames/bind'

import styles from './col.module.scss'

let cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	lg?: number,
	md?: number,
	sm?: number,
	textAlign?: string,
	xs?: number,
	borderRight?: number,
	paddingLeft?: number,
	paddingBottom?: number,
	borderColor?: string
}

export default function Col({ 
	children, 
	lg, 
	md, 
	sm, 
	textAlign, 	
	xs, 
	borderRight,
	paddingLeft,
	paddingBottom,
	borderColor
}:Props) {
	const colClasses = cx({
		col : true,
		[`col-xs-${xs}`]: xs,
		[`col-sm-${sm}`]: sm,
		[`col-md-${md}`]: md,
		[`col-lg-${lg}`]: lg,
		[`text-align-${textAlign}`] : textAlign,
		[`border-right-${borderRight}`] : borderRight,
		[`padding-left-${paddingLeft}`] : paddingLeft,
		[`padding-bottom-${paddingBottom}`] : paddingBottom,
		[`border-color-${borderColor}`] : borderColor
	
	})
	return (
		<div className={colClasses}>
			{children}
		</div>
	)
}