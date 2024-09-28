"use client";
import React from "react";
import NavSubList from "./NavSubList";
import NavList from "./NavList";
import styles from "./Header.module.scss";
import { useNav } from "../../_hooks/useNav";
import Link from "next/link";

export default function Header() {
  const { isOpen, onOpen, currentItem, onNavItemHover } = useNav();

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header-inner"]}>
          <Link href="/">
            <h1>smwaterjet</h1>
          </Link>
          <NavList
            onOpen={onOpen}
            onNavItemHover={onNavItemHover}
            currentItem={currentItem}
          />
        </div>
      </header>
      {/* display: none으로 바꾸기 */}
      <NavSubList
        isOpen={isOpen}
        onOpen={onOpen}
        onNavItemHover={onNavItemHover}
      />
    </>
  );
}
