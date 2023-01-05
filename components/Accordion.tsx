import { useState, useContext } from 'react';
import styles from './accordion.module.scss';
import Bullet from './Bullet'
import Col from './Col';
import Row from './Row';
import {getItems, getSectionContent} from '../lib/api'
import Heading from './Heading';
import Section from './Section'

import { SectionContext } from '../lib/context'
import ExpandButton from './ExpandButton';

type ItemProps = {
    label?: string, 
    slug?: string, 
    activeSection?: string, 
    setActiveSection?: Function
}

const Accordion = () => {
    const [activeSection, setActiveSection] = useContext(SectionContext);
    const items = getItems();
    return <div className={styles.accordion}>
        {items.map((item, index) => {
            const { label, slug, path } = item;
            return <Item key={index} label={label} slug={slug} activeSection={activeSection} setActiveSection={setActiveSection} />
        })}
    </div>
}
const Item = ({label, slug, activeSection, setActiveSection}:ItemProps) => {
    const [isExpanded, setIsExpanded] = useState(activeSection === slug ? true : false);
    return <Section>
        <Row paddingTop={2} paddingBottom={2}>
            <Col xs={12}>
                <div 
                className={styles.accordionHeader}
                onClick={() => {
                    setActiveSection(slug)
                    setIsExpanded(!isExpanded)
                }}
                >
                    <div>
                    <Bullet 
                width={32} 
                active={slug === activeSection ? true : false}
                />
                <Heading level={2} color={slug === activeSection ? "white" : "orange"} textTransform='uppercase'>
                    {label}
                </Heading>
                    </div>
                
                <ExpandButton 
                    clickHandler={() => {
                        activeSection === slug ? 
                            setActiveSection(null) 
                        : setActiveSection(slug)
                    }}
                    isActive={isExpanded}
                />
                </div>
            </Col>
        </Row>
        {isExpanded && <Row>
            <Col xs={12} sm={12}>
                <div className={styles.accordionContent}>
                    {getSectionContent(slug)}
                </div>
            </Col>
        </Row>}
    </Section>
}
export default Accordion;