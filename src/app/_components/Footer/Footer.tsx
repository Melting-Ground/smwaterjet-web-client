"use client";
import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import Button from "../Button/Button";
import { useAuth } from "../../_hooks/useAuth";

export default function Footer() {
  const { handleLogoutClick, handleLoginClick, isLoggedIn } = useAuth();

  return (
    <footer className={styles.footer}>
      <div className={styles["footer-inner"]}>
        <div className={styles["policy-button-container"]}>
          <ul className={styles["policy"]}>
            <cite>성문워터젯</cite>
            <li>
              <Link href={"/policy/tos"}>
                이용약관
                <RiArrowRightUpLine size={18} />
              </Link>
            </li>
            <li>
              <Link href={"/policy/privacy"}>
                개인정보처리방침
                <RiArrowRightUpLine size={18} />
              </Link>
            </li>
            <li>
              <Link href={"/policy/email"}>
                이메일무단수집거부
                <RiArrowRightUpLine size={18} />
              </Link>
            </li>
          </ul>
          {!isLoggedIn ? (
            <Button className={styles.login} onClick={handleLoginClick}>
              로그인
            </Button>
          ) : (
            <Button className={styles.logout} onClick={handleLogoutClick}>
              로그아웃
            </Button>
          )}
        </div>
        <address>
          <p>강원도 춘천시 동내면 신촌길 15</p>
          <p>
            대표전화: 033-261-4175
            {/* <strong>대표전화: </strong>
            <Link href="tel:033-261-4175">033-261-4175</Link> */}
          </p>
          <p>
            일반전화: 010-4277-6693
            {/* <strong>일반전화: </strong>
            <Link href="tel:010-4277-6693">010-4277-6693</Link> */}
          </p>
          <p>FAX: 033-261-4173</p>
        </address>
        <small>© 성문워터젯, All right reserved.</small>
      </div>
    </footer>
  );
}
