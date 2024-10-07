"use client";
import React from "react";
import NavSubList from "./NavSubList";
import NavList from "./NavList";
import styles from "./Header.module.scss";
import { useNav } from "../../_hooks/useNav";
import Link from "next/link";
import logo from "../../_images/logo-rm.png";
import Image from "next/image";

export default function Header() {
  const { isOpen, onOpen, currentItem, onNavItemHover } = useNav();

  return (
    <article className={styles["header-container"]}>
      <header className={styles.header}>
        <div className={styles["header-inner"]}>
          <Link href="/">
            <h1>
              <Image width={150} src={logo} alt="성문워터젯" />
            </h1>
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
    </article>
  );
}
