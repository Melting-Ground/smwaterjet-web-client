"use client";
import React from "react";
import styles from "./Banner.module.scss";
import { usePathname } from "next/navigation";
import { findLabelByPathname } from "@/_utils/findLabelByPathname";
// TODO:components 보다 상위 디렉토리 만들어서 옮기기
export default function Banner() {
  const pathname = usePathname();
  const label = findLabelByPathname(pathname);
  const segment = pathname.split("/")[1]; // path 대분류
  return (
    <div key={pathname} className={styles.banner} id="banner">
      <div className={`${styles.background} ${styles[segment]}`}>
        <h2>{label}</h2>
      </div>
    </div>
  );
}
