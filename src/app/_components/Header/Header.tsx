"use client";
import React from "react";
import NavSubList from "./NavSubList";
import NavList from "./NavList";
import styles from "./Header.module.scss";
import { useNav } from "@/_hooks/useNav";
import Link from "next/link";
import logo from "public/images/logo/logo.png";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";

export default function Header() {
  const { isOpen, onOpen, currentItem, onNavItemHover } = useNav();

  return (
    <article className={styles["header-container"]}>
      <header className={styles.header}>
        <div className={styles["header-inner"]}>
          <a
            href="tel:033-261-4175"
            className={styles["mobile-phone"]}
            aria-label="대표전화 033-261-4175로 전화하기"
          >
            <Phone className={styles["mobile-icon"]} aria-hidden="true" />
          </a>
          <Link href="/" className={styles["logo-link"]}>
            <h1 className={styles.logo}>
              <Image width={190} src={logo} alt="성문워터젯" />
            </h1>
          </Link>
          <NavList
            onOpen={onOpen}
            onNavItemHover={onNavItemHover}
            currentItem={currentItem}
          />
          <button
            type="button"
            className={styles["mobile-menu-button"]}
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            onClick={() => onOpen(!isOpen)}
          >
            <Menu className={styles["mobile-icon"]} aria-hidden="true" />
          </button>
        </div>
      </header>
      {/* display: none로 바꾸기?*/}
      <NavSubList
        isOpen={isOpen}
        onOpen={onOpen}
        onNavItemHover={onNavItemHover}
      />
    </article>
  );
}
