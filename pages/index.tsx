import { Fragment, useContext } from "react"
import Accordion from '../components/Accordion'
import Col from '../components/Col'
import Container from "../components/Container"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Row from '../components/Row'
import TOC from '../components/TOC'

import { ResponsiveContext } from '../lib/context'

const Homepage = () => {
  const [currentDevice] = useContext(ResponsiveContext);

  return <Fragment>
    <Container>
      <Row minHeight>
        <Col 
          xs={1} 
          sm={1} 
          borderRight={1}
          borderColor="orange" 
        />
        <Col xs={11} sm={11} paddingBottom={6}>
          <Header />
          {(currentDevice === 'md' || currentDevice === 'lg') && <TOC />}
          {(currentDevice === 'xs' || currentDevice === 'sm') && <Accordion />}
        </Col>
      </Row>
    </Container>
    <Footer />
  </Fragment>
}
export default Homepage;