import Head from "next/head"
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
    <Head>
      <title>Pixels &amp; Print Workshop | Newhouse School at Syracuse University</title>
      <meta name="description" content="Pixels &amp; Print is a design workshop for the students in the graphic design program at the S.I. Newhouse School of Public Communications at Syracuse University." />
    </Head>
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
          <main>
          {(currentDevice === 'md' || currentDevice === 'lg') && <TOC />}
          {(currentDevice === 'xs' || currentDevice === 'sm') && <Accordion />}
          </main>
        </Col>
      </Row>
    </Container>
    <Footer />
  </Fragment>
}
export default Homepage;