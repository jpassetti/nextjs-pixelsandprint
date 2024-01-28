import { ReactNode } from 'react'

import classnames from 'classnames/bind'

import styles from './paragraph.module.scss'

let cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	color?: string,
	marginBottom?: number,
    marginTop?: number,
    strong?: boolean,
    condensed?: boolean,
    caps?: boolean,
}

const Paragraph = ({ children, color, marginBottom, marginTop, strong, condensed, caps }: Props) => {
    const paragraphClasses = cx({
        paragraph: true,
        [`font-color-${color}`]: color,
        [`margin-top-${marginTop}`]: marginTop,
        [`margin-bottom-${marginBottom}`]: marginBottom,
        [`strong`]: strong,
        [`condensed`]: condensed,
        [`caps`]: caps,
    });
    return <p className={paragraphClasses}>{children}</p>;
};
export default Paragraph;