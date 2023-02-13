import classnames from 'classnames/bind'
import styles from './frame.module.scss'

let cx = classnames.bind(styles)

const Frame = ({ children, color }) => {
    let frameClasses = cx({
        frame: true,
        white: color === 'white',
    });
    return <div className={frameClasses}>
        {children}
    </div>
};
export default Frame;