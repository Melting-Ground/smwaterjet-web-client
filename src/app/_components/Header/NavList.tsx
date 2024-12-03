"use client";
import React from "react";
import styles from "./NavList.module.scss";
import Link from "next/link";
import { routeCategories } from "@/_config/routes";

export default function NavList({
  onOpen,
  onNavItemHover,
  currentItem,
}: {
  onOpen: (isOpen: boolean) => void;
  onNavItemHover: (currentItem: string) => void;
  currentItem: string;
}) {
  return (
    <nav
      className={styles.nav}
      onMouseEnter={() => onOpen(true)}
      onMouseLeave={() => onOpen(false)}
    >
      {/* <h2>메뉴</h2> */}
      <ul className={styles["nav-list"]}>
        {routeCategories.map((category) => (
          <li key={category.title}>
            {/* <h3>{category.title}</h3> */}
            <Link
              className={`${styles["nav-item"]} ${
                category.title === currentItem ? styles["nav-item--active"] : ""
              }`}
              href={category.routes[0].path}
              onMouseEnter={() => onNavItemHover(category.title)}
              onMouseLeave={() => onNavItemHover("")}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
