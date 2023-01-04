import { Fragment } from "react"
import Col from '../components/Col'
import Container from "../components/Container"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Row from '../components/Row'
import TOC from '../components/TOC'

const Homepage = () => {
  return <Fragment>
    <Container>
      <Row minHeight>
        <Col 
          xs="1" 
          sm="1" 
          borderRight={1}
          borderColor="orange" 
          borderType="dashed" 
        />
        <Col xs="11" sm="11" paddingBottom={6}>
          <Header />
          <TOC />
        </Col>
      </Row>
    </Container>
    <Footer />
  </Fragment>
}
export default Homepage;