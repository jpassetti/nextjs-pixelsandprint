import Link from 'next/link';
import ButtonWithLink from './ButtonWithLink'
import Dashes from './Dashes'
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Section from "./Section";
import Span from './Span';

const Overview = () => {
    return <Section>
        <Heading level={1} color="white" textTransform="uppercase"><Span size="small">A design workshop for</Span><br />
        <Span gradient="orange">social impact.</Span></Heading>
        <Dashes />
        <Heading level={3} color="white" textTransform="uppercase" marginBottom={4} condensed>
        February 22-24, 2024</Heading>
        <Paragraph marginBottom={6}>Workshop is limited to students in the graphic design program at the Newhouse School.</Paragraph>
       
        <ButtonWithLink href="/register" label="Register now" type="primary" gradient="lightorange-to-orange" />
    </Section>
}
export default Overview;