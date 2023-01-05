import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './label.module.scss';
let cx = classNames.bind(styles)

type Props = {
    children: ReactNode, 
    caps?: boolean, 
    fontColor?: string
}

const Label = ({children, caps, fontColor}:Props) => {
    let labelClasses = cx({
        label: true,
        caps: caps,
        [`font-color-${fontColor}`]: fontColor
    });
    return <label className={labelClasses}>{children}</label>;
};
export default Label;