import React from "react";
import Button from "../Button/Button";
import styles from "./Pagination.module.scss";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import usePagination from "@/_hooks/usePagination";

export default function Pagination({
  lastPageNumber,
}: {
  lastPageNumber: number;
}) {
  const pages = Array.from({ length: lastPageNumber }, (_, index) => index + 1);

  const { currentPage, clickPageButton, clickNextButton, clickPreviousButton } =
    usePagination(lastPageNumber);
  const handlePageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value;
    clickPageButton(Number(value));
  };

  return (
    <section className={styles.pagination}>
      <Button
        color="transparent"
        className={styles.arrow}
        icon={<RiArrowLeftSLine size={22} color="#8a8f97" />}
        onClick={clickPreviousButton}
      />
      {pages.map((page) => (
        <Button
          key={page}
          color="transparent"
          className={`${styles["pagination-button"]} ${
            page === currentPage ? styles.active : styles.inActive
          }`}
          value={page.toString()}
          onClick={handlePageClick}
        >
          {page}
        </Button>
      ))}
      <Button
        color="transparent"
        className={styles.arrow}
        icon={<RiArrowRightSLine size={22} color="#8a8f97" />}
        onClick={clickNextButton}
      />
    </section>
  );
}
