import classnames from 'classnames/bind'

import styles from './bullet.module.scss'

const cx = classnames.bind(styles)

type Props = {
    width: number, 
    active?: boolean, 
    isFocused?: boolean, 
    isHovered?: boolean
}


const Bullet = ({width, active, isFocused, isHovered}:Props) => {
    const orangeClasses = cx({
        orange: true,
        active: active,
        isFocused: isFocused,
        isHovered: isHovered
    });
    const whiteClasses = cx({
        white: true,
        active: active
    });
    return <svg 
        width={width}
        height={width}
        x="0px" 
        y="0px"
        viewBox="0 0 100 100" 
        //style={{ enableBackground : 'new 0 0 100 100' }} 
        xmlSpace="preserve"
        className={styles.bullet}
    >
   <circle className={styles.navyblue} cx="50" cy="50" r="50"/>
   <circle className={orangeClasses} cx="50" cy="50" r="37.5"/>
   <circle className={whiteClasses} cx="50" cy="50" r="37.5" />

</svg>
}
export default Bullet;