import classnames from 'classnames/bind'

import styles from './button.module.scss'

let cx = classnames.bind(styles);

interface ButtonProps {
    label: string;
    inverse?: boolean; // 
    type?: string;
    gradient?: boolean;
    clickHandler?: () => void; // assuming it's a function that takes no arguments and returns nothing
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    inverse, 
    type, 
    gradient, 
    clickHandler 
}) => {
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