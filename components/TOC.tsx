import { useState, useEffect } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import Bullet from './Bullet';
import Col from './Col';
import Container from "./Container";
import Row from './Row';
import Section from './Section';

import {getItems} from '../lib/api'

import SVGtext from './SVGtext';

import classnames from 'classnames/bind'

import { getSectionContent } from '../lib/api'

import styles from './toc.module.scss'

let cx = classnames.bind(styles)

const TOC = () => {
    const [activeItem, setActiveItem] = useState("about");
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
                    className={slug === activeItem ? styles.active : ""}
                    onClick={() => {
                        setActiveItem(slug)
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
                            setActiveItem(slug);
                            setCurrentIndex(index)
                        }
                    }}
                    onMouseOver={() => setHoveredItem(slug)}
                    onMouseOut={() => setHoveredItem(null)}
                >
                     <Bullet 
                        width={32} 
                        active={slug === activeItem ? true : false} 
                        isFocused={slug === focusedItem ? true : false}
                        isHovered={slug === hoveredItem ? true : false}
                    />
                    <SVGtext 
                        path={path}
                        slug={slug} 
                        isActive={slug === activeItem ? true : false} 
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
                {activeItem && <Section key={activeItem}>
                    {getSectionContent(activeItem)}
                </Section>}
            </AnimatePresence>
        </div>
        </Row>
    }
export default TOC;