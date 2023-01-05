import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import Bullet from './Bullet';
import Col from './Col';
import Container from "./Container";
import Row from './Row';
import Section from './Section';
import { SectionContext } from '../lib/context'
import {getItems} from '../lib/api'

import SVGtext from './SVGtext';

import classnames from 'classnames/bind'

import { getSectionContent } from '../lib/api'

import styles from './toc.module.scss'

let cx = classnames.bind(styles)

const TOC = () => {
    const [activeSection, setActiveSection] = useContext(SectionContext);
    const [focusedItem, setFocusedItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [oldIndex, setOldIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const items = getItems();

    return <Row alignItems="stretch">
        <div className={styles.tocLeft}>
            <ul>
            {items.map((item, index) => {
                const { label, slug, path } = item;
                return (
                <li
                    key={index}
                    className={slug === activeSection ? styles.active : ""}
                    onClick={() => {
                        setActiveSection(slug)
                        setCurrentIndex(index)
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
                            setCurrentIndex(index)
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
                        slug={slug} 
                        isActive={slug === activeSection ? true : false} 
                        isFocused={slug === focusedItem ? true : false}
                        isHovered={slug === hoveredItem ? true : false}
                        direction={direction}
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