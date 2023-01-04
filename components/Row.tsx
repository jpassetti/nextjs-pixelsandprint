import { ReactNode } from 'react'
import classnames from 'classnames/bind'

import styles from './row.module.scss'

let cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	alignItems?: string,
	minHeight?: boolean,
	paddingBottom?: number,
	paddingTop?: number,
	hideOnMobile?: boolean,
	borderBottom?: number,
	borderBottomColor?: string
}

export default function Row({ 
	children,
	alignItems,
	minHeight,
	paddingBottom,
	paddingTop,
	hideOnMobile,
	borderBottom,
	borderBottomColor
}: Props) {
	//console.log({ attribs });
	const rowClasses = cx({
		row : true,
		[`align-items-${alignItems}`]: alignItems,
		[`min-height`] : minHeight,
		[`padding-bottom-${paddingBottom}`] : paddingBottom,
		[`padding-top-${paddingTop}`] : paddingTop,
		[`hide-on-mobile`] : hideOnMobile,
		[`border-bottom-${borderBottom}`] : borderBottom,
		[`border-bottom-color-${borderBottomColor}`] : borderBottomColor
	})

	return (
		<div className={rowClasses}>
			{children}
		</div>
	)
}