"use client";
import React from "react";
import styles from "./NavList.module.scss";
import Link from "next/link";
import { useNav } from "../../_hooks/useNav";
import { routeCategories } from "../../_config/routes";

export default function NavList({
  onOpen,
}: {
  onOpen: (isOpen: boolean) => void;
}) {
  const { currentItem, onNavItemHover } = useNav();
  return (
    <nav
      className={styles.nav}
      onMouseEnter={() => onOpen(true)}
      onMouseLeave={() => onOpen(false)}
    >
      <h2>메뉴</h2>
      <ul className={styles["nav-list"]}>
        {routeCategories.map((category) => (
          <li key={category.title}>
            <h3>{category.title}</h3>
            <Link
              href={category.routes[0].path}
              onMouseEnter={() => onNavItemHover("greeting")}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
