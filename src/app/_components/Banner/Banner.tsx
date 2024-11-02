"use client";
import React from "react";
import styles from "./Banner.module.scss";
import { usePathname } from "next/navigation";
import { findLabelByPathname } from "../../_utils/findLabelByPathname";

export default function Banner() {
  const pathname = usePathname();
  const label = findLabelByPathname(pathname);
  const segment = pathname.split("/")[1]; // path 대분류
  console.log(pathname, segment, label);
  return (
    <div key={pathname} className={styles.banner} id="banner">
      <div className={`${styles.background} ${styles[segment]}`}>
        <h2>{label}</h2>
      </div>
    </div>
  );
}
