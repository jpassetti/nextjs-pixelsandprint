import classNames from 'classnames/bind';
import styles from './label.module.scss';
let cx = classNames.bind(styles)

const Label = ({children, caps, fontColor}) => {
    let labelClasses = cx({
        label: true,
        caps: caps,
        [`font-color-${fontColor}`]: fontColor
    });
    return <label className={labelClasses}>{children}</label>;
};
export default Label;