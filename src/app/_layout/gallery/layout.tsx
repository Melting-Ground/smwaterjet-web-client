import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./layout.module.scss";
import Pagination from "@/_components/Pagination/Pagination";
import { PhotoType } from "@/_types/photo";

interface GalleryProps<T extends PhotoType> {
  list: T[];
  isLinkItem?: boolean;
  captionPosition?: "overlay" | "below";
  useInnerContainer?: boolean;
  paginationMarginTop?: number;
  handleItemClick?: (item: PhotoType) => void;
  handleArrowClick?: (direction: "prev" | "next") => void;
  handlePageClick?: (page: number) => void;
  pages?: number[];
  currentPage?: number;
}

export default function GalleryLayout<T extends PhotoType>({
  list,
  isLinkItem = false,
  captionPosition = "overlay",
  useInnerContainer = true,
  paginationMarginTop,
  handleItemClick,
  handleArrowClick,
  handlePageClick,
  pages,
  currentPage,
}: GalleryProps<T>) {
  const hasItems = list && list.length > 0;
  const containerClassName = `${styles.container} ${
    useInnerContainer ? styles["container-inner"] : ""
  }`;
  const galleryClassName = `${styles.gallery} ${
    hasItems ? "" : styles["gallery-empty"]
  }`;
  const handlePrevArrowClick = () => {
    if (!handleArrowClick) return;
    handleArrowClick("prev");
  };

  const handleNextArrowClick = () => {
    if (!handleArrowClick) return;
    handleArrowClick("next");
  };

  const handlePageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!handlePageClick) return;
    const value = (e.target as HTMLButtonElement).value;
    handlePageClick(Number(value));
  };

  return (
    <div className={containerClassName}>
      <ol className={galleryClassName}>
        {hasItems
          ? list.map((item, index) => {
              if (!item.path) return null;
              const isRowEnd = (index + 1) % 4 === 0;
              const shouldShowDivider = isRowEnd && index < list.length - 1;
              return (
                <React.Fragment key={item.id}>
                  <li className={styles["image-container"]}>
                    {isLinkItem ? (
                      <Link href={`/equipment/${item.id}`}>
                        <div className={styles["image-wrap"]}>
                          <Image
                            src={item.path}
                            alt={item.title || ""}
                            fill
                            sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw"
                            className={styles.image}
                          />
                          {captionPosition === "overlay" ? (
                            <div className={styles.overlay}>
                              <span className={styles.description}>
                                {item.title}
                              </span>
                            </div>
                          ) : null}
                        </div>
                        {captionPosition === "below" ? (
                          <span className={styles.caption}>{item.title}</span>
                        ) : null}
                      </Link>
                    ) : (
                      <>
                        <div className={styles["image-wrap"]}>
                          <Image
                            src={item.path}
                            alt={item.title || ""}
                            fill
                            sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw"
                            className={styles.image}
                            onClick={() =>
                              handleItemClick && handleItemClick(item)
                            }
                          />
                          {captionPosition === "overlay" ? (
                            <div className={styles.overlay}>
                              <span className={styles.description}>
                                {item.title}
                              </span>
                            </div>
                          ) : null}
                        </div>
                        {captionPosition === "below" ? (
                          <span className={styles.caption}>{item.title}</span>
                        ) : null}
                      </>
                    )}
                  </li>
                  {shouldShowDivider ? (
                    <li
                      className={styles["row-divider"]}
                      aria-hidden="true"
                      role="presentation"
                    />
                  ) : null}
                </React.Fragment>
              );
            })
          : null}
      </ol>
      {pages && currentPage ? (
        <Pagination
          currentPage={currentPage}
          pages={pages}
          handlePageButtonClick={handlePageButtonClick}
          handlePrevArrowClick={handlePrevArrowClick}
          handleNextArrowClick={handleNextArrowClick}
          style={
            typeof paginationMarginTop === "number"
              ? { marginTop: paginationMarginTop }
              : undefined
          }
        />
      ) : null}
    </div>
  );
}
