import styles from './buttongroup.module.scss';

const ButtonGroup = ({ children }) => {
    return <div className={styles.button_group}>{children}</div>;
    }
export default ButtonGroup;