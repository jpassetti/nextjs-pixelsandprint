import classnames from 'classnames/bind'

import styles from './button.module.scss'

let cx = classnames.bind(styles)

const Button = ({label, inverse}) => {
    let buttonClasses = cx({
        button: true,
        inverse: inverse
    });
    return <button className={buttonClasses}>{label}</button>;
}
export default Button;