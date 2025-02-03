"use client";
import React, { useEffect } from "react";
import GalleryLayout from "@/_layout/gallery/layout";
import styles from "./page.module.scss";
import { useAuth } from "@/_hooks/useAuth";
import Button from "@/_components/Button/Button";
import useBoardAction from "@/_hooks/useBoardAction";
import usePagination from "@/_hooks/usePagination";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
// 현장 사진
export default function Photos() {
  // const imageList: GalleryItemType[] = [
  //   {
  //     image: "/images/waterjet.jpg",
  //     id: 1,
  //     title: "gkgk",
  //   },
  //   {
  //     image: "/images/waterjet.jpg",
  //     id: 1,
  //     title: "gkgk",
  //   },
  //   {
  //     image: "/images/waterjet.jpg",
  //     id: 1,
  //     title: "gkgk",
  //   },
  //   {
  //     image: "/images/waterjet.jpg",
  //     id: 1,
  //     title: "gkgk",
  //   },
  //   {
  //     image: "/images/waterjet.jpg",
  //     id: 1,
  //     title: "gkgk",
  //   },
  // ];
  const boardType = "photos";

  const { goToEditPage } = useBoardAction("performance", boardType);

  const {
    dataList: photos,
    paginationInfo,
    fetchDataList,
  } = useAPIData<typeof API_URLS.photos.method.get>(API_URLS.photos);

  console.log(photos);
  const lastPageNumber = paginationInfo?.lastPage || 1;

  const {
    currentPage,
    pages,
    clickArrowButton,
    clickPageButton,
    setCurrentPage,
  } = usePagination(lastPageNumber);

  useEffect(() => {
    fetchDataList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);
  const { isLoggedIn } = useAuth();

  return (
    <section>
      <h3 className={styles["sr-only"]}>현장 작업 사진</h3>
      {isLoggedIn ? (
        <Button
          ariaLabel="글쓰기"
          onClick={() => goToEditPage()}
          color="primary"
          className={styles["write-button"]}
        >
          글쓰기
        </Button>
      ) : null}

      <GalleryLayout
        list={photos}
        // 페이지네이션
        pages={pages}
        handleArrowClick={clickArrowButton}
        handlePageClick={clickPageButton}
        currentPage={currentPage}
      />
    </section>
  );
}
