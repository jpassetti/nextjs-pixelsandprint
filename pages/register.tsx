import Col from "../components/Col";
import Container from "../components/Container";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import Row from "../components/Row";

const RegisterPage = () => {
    return <Container>
        <Header />
        <main>
            <Row>
                <Col xs={12} sm={12} paddingLeft={3}>
                    <Heading level={1} color="white" marginTop={8} marginBottom={3}>Register</Heading>
                    <Paragraph marginBottom={4}>To register for the workshop, please fill out the following form.</Paragraph>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc4IUkQ9g-v4CJzDRzvzJGBOJMSytP2tw16j0I0gvbIqWmE4w/viewform?embedded=true"  width="100%" height={3000}>Loading…</iframe>
                    {/*<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSebzjcdleEwPu3YItR0jGVNPMIfuy40rsnGGK_zcgFcG-jJrA/viewform?c=0&w=1" width="100%" height="1310"></iframe>*/}
                </Col>
            </Row>
        </main>
    </Container>
}
export default RegisterPage;