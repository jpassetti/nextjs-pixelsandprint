import { ReactNode } from 'react'

import classnames from 'classnames/bind'

import styles from './paragraph.module.scss'

let cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	color?: string,
	marginBottom?: number,
    strong?: boolean,
    condensed?: boolean,
    caps?: boolean,
}

const Paragraph = ({ children, color = 'black', marginBottom, strong, condensed, caps }: Props) => {
    const paragraphClasses = cx({
        paragraph: true,
        [`color-${color}`]: color,
        [`margin-bottom-${marginBottom}`]: marginBottom,
        [`strong`]: strong,
        [`condensed`]: condensed,
        [`caps`]: caps,
    });
    return <p className={paragraphClasses}>{children}</p>;
};
export default Paragraph;