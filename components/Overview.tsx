import { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import Button from './Button';
import ButtonWithLink from './ButtonWithLink';
import ButtonGroup from './ButtonGroup';
import Dashes from './Dashes'
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Section from "./Section";
import Span from './Span';

import { SectionContext } from '../lib/context'

const Overview = () => {
    const [activeSection, setActiveSection] = useContext(SectionContext);
    return <Section>
        <Heading level={1} color="white" textTransform="uppercase"><Span size="small">A design workshop for</Span><br />
        <Span gradient="orange">social impact.</Span></Heading>
        <Dashes />
        <Heading level={3} color="white" textTransform="uppercase" marginBottom={4} condensed>
        Feb. 22-24, 2024</Heading>
        <Paragraph marginBottom={6}>Workshop is limited to students in the graphic design program at the Newhouse School.</Paragraph>
       
       <ButtonGroup>
        <ButtonWithLink href="/register" label="Register now" type="primary" gradient="lightorange-to-orange" />
        <Button label="About" inverse clickHandler={() =>{
            setActiveSection("about");
        }} />
        </ButtonGroup>
    </Section>
}
export default Overview;