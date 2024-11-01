"use client";
import React from "react";
import styles from "./Banner.module.scss";
import { usePathname } from "next/navigation";
import { routeCategories } from "../../_config/routes";

export const findLabelByPathname = (pathname: string): string | null => {
  // path의 마지막 부분(id 등) 제거
  const basePathName = pathname.substring(0, pathname.lastIndexOf("/"));

  for (const category of routeCategories) {
    for (const route of category.routes) {
      if (route.path === basePathName) {
        return route.label;
      }
    }
  }
  return null;
};

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
