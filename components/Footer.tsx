import Container from "./Container";
import styles from './footer.module.scss'
import Paragraph from "./Paragraph";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
            <Paragraph>Copyright 2022-23 Newhouse School at Syracuse University.</Paragraph>
            </Container>
        </footer>
    );
};
export default Footer;