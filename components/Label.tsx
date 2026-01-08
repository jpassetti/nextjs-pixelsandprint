import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './label.module.scss';
const cx = classNames.bind(styles)

type Props = {
    children: ReactNode, 
    caps?: boolean, 
    fontColor?: string,
    fontWeight?: string,
}

const Label = ({children, caps, fontColor, fontWeight}:Props) => {
    const labelClasses = cx({
        label: true,
        caps: caps,
        [`font-color-${fontColor}`]: fontColor,
        [`font-weight-${fontWeight}`]: fontWeight
    });
    return <label className={labelClasses}>{children}</label>;
};
export default Label;