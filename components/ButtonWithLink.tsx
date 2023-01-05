import Link from 'next/link';
import classnames from 'classnames/bind'

import styles from './button.module.scss'

let cx = classnames.bind(styles)

const ButtonWithLink = ({href, label, type, gradient}) => {
    let buttonClasses = cx({
        button: true,
        [`primary`] : type === "primary",
        [`gradient-${gradient}`]: gradient,
    });
    return <Link href={href} className={buttonClasses}>
        {label}
    </Link>
}
export default ButtonWithLink;