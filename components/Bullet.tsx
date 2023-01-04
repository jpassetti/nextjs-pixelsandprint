import classnames from 'classnames/bind'

import styles from './bullet.module.scss'

let cx = classnames.bind(styles)

const Bullet = ({width, active, isFocused, isHovered}) => {
    let orangeClasses = cx({
        orange: true,
        active: active,
        isFocused: isFocused,
        isHovered: isHovered
    });
    let whiteClasses = cx({
        white: true,
        active: active
    });
    return <svg 
        x="0px" 
        y="0px"
        viewBox="0 0 100 100" 
        style={{ enableBackground: `new 0 0 100 100`}} 
        xmlSpace="preserve"
        className={styles.bullet}
        width={width}
    >
   <circle className={styles.navyblue} cx="50" cy="50" r="50"/>
   <circle className={orangeClasses} cx="50" cy="50" r="37.5"/>
   <circle className={whiteClasses} cx="50" cy="50" r="37.5" />

</svg>
}
export default Bullet;