import React from "react";
import styles from "./NavSubList.module.scss";
import { routeCategories } from "../../_config/routes";
import Link from "next/link";
import { RouteType, RouteCategoryType } from "../../_types/route";

export default function NavSubList({
  isOpen,
  onOpen,
  onNavItemHover,
}: {
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
  onNavItemHover: (currentItem: string) => void;
}) {
  return (
    <div
      className={`${styles["sub-nav-container"]} ${
        isOpen ? "" : styles.hidden
      }`}
      onMouseEnter={() => onOpen(true)}
      onMouseLeave={() => onOpen(false)}
    >
      <div className={styles["sub-nav-list-container"]}>
        <span />

        <ul className={styles["sub-nav-list"]}>
          {routeCategories.map((category: RouteCategoryType) => (
            <li key={category.title} className={styles["category-container"]}>
              <h4 className={styles.title}>{category.title}</h4>
              <ul className={styles["category-list"]}>
                {category.routes.map((route: RouteType) => (
                  <li key={route.path} className={styles["category-item"]}>
                    <Link
                      onMouseEnter={() => {
                        onNavItemHover(category.title);
                      }}
                      onMouseLeave={() => onNavItemHover("")}
                      href={route.path}
                      className={styles["category-item-link"]}
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
