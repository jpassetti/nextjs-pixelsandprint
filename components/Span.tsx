import { ReactNode } from 'react'
import classnames from 'classnames/bind'

import styles from './span.module.scss'

const cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	color?: string,
	size?: string, 
    gradient?: string, 
    fontWeight?: string,
}

const Span = ({children, color, size, gradient, fontWeight}:Props) => {
    const spanClasses = cx({
        span: true,
        [`font-color-${color}`]: color,
        [`font-size-${size}`]: size,
        [`font-weight-${fontWeight}`] : fontWeight,
        [`gradient-${gradient}`]: gradient
    })
    return <span className={spanClasses}>{children}</span>
}
export default Span;