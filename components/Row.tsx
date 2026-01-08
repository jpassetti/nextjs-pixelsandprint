import { ReactNode } from 'react'
import classnames from 'classnames/bind'

import styles from './row.module.scss'

const cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	alignItems?: string,
	marginBottom?: number,
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
	marginBottom,
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
		[`margin-bottom-${marginBottom}`]: marginBottom,
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