import { motion } from 'framer-motion';
import styles from './section.module.scss';

const Section = ({ children }) => {
    let sectionVariants = {
        closed: {
            opacity: 0,
            x: 25,
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: 0.5,
            }
        },
        exit: {
            opacity: 0,
            x: 25,
            transition: {
                duration: 0.5,
            }
        }
    }

    return <motion.section className={styles.section} variants={sectionVariants} animate="open" initial="closed" exit="exit">
        {children}
    </motion.section>
}
export default Section