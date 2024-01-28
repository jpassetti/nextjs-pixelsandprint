import classnames from 'classnames/bind'

import styles from './button.module.scss'

let cx = classnames.bind(styles)

const Button = ({label, inverse, type, gradient, clickHandler}) => {
    let buttonClasses = cx({
        button: true,
        inverse: inverse,
        [`primary`] : type === "primary",
        [`gradient-${gradient}`]: gradient,
    });
    return <button className={buttonClasses} onClick={() => {
        if (clickHandler) {
            clickHandler();
        }
    }}>{label}</button>;
}
export default Button;