"use client";

import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { usePathname, useRouter } from "next/navigation";

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
  const [activeLink, setActiveLink] = useState("overview");
  const router = useRouter();
  const pathname = usePathname();

  // Extract the year dynamically from the path (e.g., /2023, /2024)
  const match = pathname?.match(/^\/(\d{4})/);
  const year = match ? match[1] : null;

  const handleSetActive = (to: string) => {
    setActiveLink(to);
  };

  const handleNavigation = (id: string) => {
    if (year && pathname === `/${year}`) {
      // Smooth scrolling for the current year's homepage
      const scrollLink = document.querySelector(`#${id}`);
      if (scrollLink) {
        scrollLink.scrollIntoView({ behavior: "smooth" });
      }
    } else if (year) {
      // Redirect to the appropriate year's homepage with a hash
      router.push(`/${year}#${id}`);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {items.map((item, index) => {
          const { title, id } = item;
          return (
            <li key={index}>
              {year && pathname === `/${year}` ? (
                <ScrollLink
                  to={id}
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  activeClass={styles.active}
                  onSetActive={handleSetActive}
                >
                  {title}
                </ScrollLink>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(id);
                  }}
                  className={activeLink === id ? styles.active : ""}
                >
                  {title}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;