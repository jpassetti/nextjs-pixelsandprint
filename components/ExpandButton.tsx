import classnames from 'classnames/bind'
import Icon from './Icon'
import styles from './expandbutton.module.scss'

let cx = classnames.bind(styles)

const ExpandButton = ({clickHandler, isActive}) => {
    let expandButtonClasses = cx({
        expandbutton: true,
        active: isActive
    });
    return <button onClick={clickHandler} className={expandButtonClasses}>
        <Icon icon="plus" />
    </button>
}
export default ExpandButton