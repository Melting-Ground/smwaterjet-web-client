import React from "react";
import styles from "./NavSubList.module.scss";
import { routeCategories } from "../../_config/routes";
import Link from "next/link";
import { Route, RouteCategory } from "../../_types/route";

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
          {routeCategories.map((category: RouteCategory) => (
            <li key={category.title} className={styles["category-container"]}>
              <h4 className={styles.title}>{category.title}</h4>
              <ul>
                {category.routes.map((route: Route) => (
                  <li key={route.path}>
                    <Link
                      onMouseEnter={() => {
                        onNavItemHover(category.title);
                      }}
                      onMouseLeave={() => onNavItemHover("")}
                      href={route.path}
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
