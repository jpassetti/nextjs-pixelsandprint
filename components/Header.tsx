import styles from './header.module.scss';
import Button from './Button';
import Col from './Col';
import Container from './Container';
import Logo from './Logo';
import Paragraph from './Paragraph';
import Row from './Row'

const Header = () => {
    return <header className={styles.header}>
            <Row>
                <Col xs={8} sm={6} md={3} textAlign="center" paddingLeft={4}>
                    <Logo marginBottom={4} entity="newhouse" variant="primary" width={100} />
                </Col>
            </Row>
            <Row>
                <Col xs={10} sm={8} md={4} paddingLeft={4}>
                    <Logo entity="pixels-and-print" />
                </Col>
            </Row>
    </header>
}
export default Header
