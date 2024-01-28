import Container from "./Container";
import styles from './footer.module.scss'
import Paragraph from "./Paragraph";

const Footer = () => {
     return (
        <footer className={styles.footer}>
            <Container>
            <Paragraph>Copyright 2024 <a style={{ color: "white"}} href="https://newhouse.syr.edu" target="_blank">Newhouse School</a> at <a style={{ color: "white"}} href="https://www.syracuse.edu" target="_blank">Syracuse University</a>.</Paragraph>
            </Container>
        </footer>
    );
};
export default Footer;