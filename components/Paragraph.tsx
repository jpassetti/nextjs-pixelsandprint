import { ReactNode } from 'react'

import classnames from 'classnames/bind'

import styles from './paragraph.module.scss'

let cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	color?: string,
	marginBottom?: number,
    strong?: boolean
}

const Paragraph = ({ children, color = 'black', marginBottom, strong }: Props) => {
    const paragraphClasses = cx({
        paragraph: true,
        [`color-${color}`]: color,
        [`margin-bottom-${marginBottom}`]: marginBottom,
        [`strong`]: strong
    });
    return <p className={paragraphClasses}>{children}</p>;
};
export default Paragraph;