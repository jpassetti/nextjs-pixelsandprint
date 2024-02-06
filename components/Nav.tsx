"use client";

import React from "react";

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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent the default link behavior

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {items.map((item, index) => {
          const { title, id } = item; // Assuming you're only using 'title' for rendering
          return (
            <li key={index}>
              <a href={`#${id}`} onClick={(e) => handleClick(e, id)}>
                {title}
              </a>
            </li>
          ); // Consider using 'slug' or a more unique identifier as the key if possible
        })}
      </ul>
    </nav>
  );
};

export default Nav;
