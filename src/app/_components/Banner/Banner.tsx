"use client";
import React from "react";
import styles from "./Banner.module.scss";
import { usePathname } from "next/navigation";
import { routeCategories } from "../../_config/routes";

export const findLabelByPathname = (pathname: string): string | null => {
  for (const category of routeCategories) {
    for (const route of category.routes) {
      if (route.path === pathname) {
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

  return (
    <div key={pathname} className={styles.banner}>
      <div className={`${styles.background} ${styles[segment]}`}>
        <h2>{label}</h2>
      </div>
    </div>
  );
}
