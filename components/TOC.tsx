import { useState, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import Bullet from './Bullet';
import Row from './Row';
import Section from './Section';
import { SectionContext } from '../lib/context'
import {getItems} from '../lib/api'

import SVGtext from './SVGtext';
import { getSectionContent } from '../lib/api'

import styles from './toc.module.scss'

const TOC = () => {
    const [activeSection, setActiveSection] = useContext(SectionContext);
    const [focusedItem, setFocusedItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    const items = getItems();

    return <Row alignItems="stretch">
        <div className={styles.tocLeft}>
            <ul>
            {items.map((item, index) => {
                const { slug, path } = item;
                return (
                <li
                    key={index}
                    className={slug === activeSection ? styles.active : ""}
                    onClick={() => {
                        setActiveSection(slug)
                    }}
                    tabIndex={0}
                    onFocus={() => {
                        setFocusedItem(slug)
                    }}
                    onBlur={() => {
                        setFocusedItem(null)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setActiveSection(slug);
                        }
                    }}
                    onMouseOver={() => setHoveredItem(slug)}
                    onMouseOut={() => setHoveredItem(null)}
                >
                     <Bullet 
                        width={32} 
                        active={slug === activeSection ? true : false} 
                        isFocused={slug === focusedItem ? true : false}
                        isHovered={slug === hoveredItem ? true : false}
                    />
                    <SVGtext 
                        path={path}
                        isActive={slug === activeSection ? true : false} 
                        isFocused={slug === focusedItem ? true : false}
                        isHovered={slug === hoveredItem ? true : false}
                    />
                </li>
                );
            })
            }
            </ul>
        </div>
        <div className={styles.tocRight}>
            <AnimatePresence>
                {activeSection && <Section key={activeSection}>
                    {getSectionContent(activeSection)}
                </Section>}
            </AnimatePresence>
        </div>
        </Row>
    }
export default TOC;