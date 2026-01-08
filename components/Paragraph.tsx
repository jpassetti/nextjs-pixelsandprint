import { ReactNode } from 'react'

import classnames from 'classnames/bind'

import styles from './paragraph.module.scss'

const cx = classnames.bind(styles)

type Props = {
    children?: ReactNode,
	color?: string,
	marginBottom?: number,
    marginTop?: number,
    strong?: boolean,
    condensed?: boolean,
    caps?: boolean,
    textAlign?: string,
}

const Paragraph = ({ children, color, marginBottom, marginTop, strong, condensed, caps, textAlign }: Props) => {
    const paragraphClasses = cx({
        paragraph: true,
        [`font-color-${color}`]: color,
        [`margin-top-${marginTop}`]: marginTop,
        [`margin-bottom-${marginBottom}`]: marginBottom,
        [`strong`]: strong,
        [`condensed`]: condensed,
        [`caps`]: caps,
        [`text-align-${textAlign}`] : textAlign,
    });
    return <p className={paragraphClasses}>{children}</p>;
};
export default Paragraph;