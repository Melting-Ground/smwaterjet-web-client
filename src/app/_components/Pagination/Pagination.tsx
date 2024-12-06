import React from "react";
import Button from "../Button/Button";
import styles from "./Pagination.module.scss";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function Pagination({
  lastPageNumber,
}: {
  lastPageNumber: number;
}) {
  const pages = Array.from({ length: lastPageNumber }, (_, index) => index + 1);

  return (
    <section className={styles.pagination}>
      <Button
        color="transparent"
        className={styles.arrow}
        icon={<RiArrowLeftSLine size={22} color="#8a8f97" />}
      />
      {pages.map((page) => (
        <Button
          key={page}
          color="transparent"
          className={styles["pagination-button"]}
        >
          {page}
        </Button>
      ))}
      <Button
        color="transparent"
        className={styles.arrow}
        icon={<RiArrowRightSLine size={22} color="#8a8f97" />}
      />
    </section>
  );
}
