import styles from './grid.module.scss'
import { motion } from 'framer-motion';

const Grid = ({ children }) => {
    const variants = {
        open: {
          transition: { staggerChildren: 0.05, delayChildren: 0.6 }
        },
        closed: {
          transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
      };
    return (
        <motion.div className={styles.grid} variants={variants}>
            {children}
        </motion.div>
    )
}
export default Grid