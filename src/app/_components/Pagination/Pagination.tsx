import React from "react";
import Button from "../Button/Button";
import styles from "./Pagination.module.scss";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function Pagination({
  pages,
  currentPage,
  handlePageButtonClick,
  handlePrevArrowClick,
  handleNextArrowClick,
}: {
  pages: number[];
  currentPage: number;
  handlePrevArrowClick: () => void;
  handleNextArrowClick: () => void;
  handlePageButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <section className={styles.pagination}>
      <Button
        color="transparent"
        className={styles.arrow}
        icon={<RiArrowLeftSLine size={22} color="#8a8f97" />}
        onClick={handlePrevArrowClick}
      />
      {pages.map((page) => (
        <Button
          key={page}
          color="transparent"
          className={`${styles["pagination-button"]} ${
            page === currentPage ? styles.active : styles.inActive
          }`}
          value={page.toString()}
          onClick={handlePageButtonClick}
        >
          {page}
        </Button>
      ))}
      <Button
        color="transparent"
        className={styles.arrow}
        icon={<RiArrowRightSLine size={22} color="#8a8f97" />}
        onClick={handleNextArrowClick}
      />
    </section>
  );
}
