"use client";

import React, { useState } from "react";
import { Link } from "react-scroll";

import styles from "./nav.module.scss";

// Define a type for individual item
type NavItem = {
  title: string;
  slug: string;
  id: string;
};

// Define a type for the component's props
type NavProps = {
  items: NavItem[];
};

const Nav: React.FC<NavProps> = ({ items }) => {
  const [activeLink, setActiveLink] = useState('overview');

  const handleSetActive = (to) => {
    setActiveLink(to);
  };

   return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {items.map((item, index) => {
          const { title, id } = item; // Assuming you're only using 'title' for rendering
          return <li key={index}><Link to={id} spy={true} smooth={true} offset={0} duration={500} activeClass={styles.active} onSetActive={handleSetActive}>{title}</Link></li>

        })}
      </ul>
    </nav>
  );
};

export default Nav;
