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
import { useRouter, useSearchParams } from "next/navigation";

export default function Photos() {
  const boardType = "photos";
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const router = useRouter();
  const searchParams = useSearchParams();
  const buildImageUrl = (path?: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (!imageBaseUrl) return path.startsWith("/") ? path : `/${path}`;
    const base = imageBaseUrl.endsWith("/")
      ? imageBaseUrl.slice(0, -1)
      : imageBaseUrl;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${base}/${cleanPath}`;
  };

  const { goToEditPage } = useBoardAction("performance", boardType);

  const { dataList: photos, paginationInfo, fetchDataList } = useAPIData<
    typeof API_URLS.photos.method.get
  >(API_URLS.photos);

  console.log(photos);
  const lastPageNumber = paginationInfo?.lastPage || 1;

  const {
    currentPage,
    pages,
    clickArrowButton,
    clickPageButton,
  } = usePagination(lastPageNumber);

  useEffect(() => {
    fetchDataList(currentPage, 8);
  }, [currentPage, fetchDataList]);

  const { isLoggedIn } = useAuth();
  const handleDetailOpen = (item: { id: number }) => {
    const query = searchParams.toString();
    const detailUrl = query
      ? `/business/photos/${item.id}?${query}`
      : `/business/photos/${item.id}`;
    router.push(detailUrl);
  };

  return (
    <section className={styles.container}>
      <h3 className={styles["sr-only"]}>?占쎌옣 ?占쎌뾽 ?占쎌쭊</h3>
      <div className={styles["photos-container"]}>
        <GalleryLayout
          list={photos.map((photo) => ({
            ...photo,
            path: buildImageUrl(
              photo.thumbnail_path || photo.files?.[0]?.file_path
            ),
          }))}
          captionPosition="below"
          useInnerContainer={false}
          paginationMarginTop={0}
          galleryMarginBottom={40}
          handleItemClick={handleDetailOpen}
          pages={pages}
          handleArrowClick={clickArrowButton}
          handlePageClick={clickPageButton}
          currentPage={currentPage}
        />
        {isLoggedIn ? (
          <Button
            ariaLabel="글쓰기"
            onClick={() => goToEditPage()}
            color="primary"
            className={styles["write-button-bottom"]}
          >
            글쓰기
          </Button>
        ) : null}
      </div>
    </section>
  );
}
