"use client";
import React, { useEffect, useState } from "react";
import GalleryLayout from "@/_layout/gallery/layout";
import styles from "./page.module.scss";
import { useAuth } from "@/_hooks/useAuth";
import Button from "@/_components/Button/Button";
import useBoardAction from "@/_hooks/useBoardAction";
import usePagination from "@/_hooks/usePagination";
import { API_URLS } from "@/_config/apiConfig";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import axiosInstance from "@/_config/axiosInstance";
import { PaginationInfoType } from "@/_types/pagination";

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

  const { goToEditPage } = useBoardAction("business", boardType);

  const [lastPageNumber, setLastPageNumber] = useState(1);

  const {
    currentPage,
    pages,
    clickArrowButton,
    clickPageButton,
  } = usePagination(lastPageNumber);

  type PhotoItem = typeof API_URLS.photos.method.get;
  const limit = 8;
  const { data } = useSWR<{ items: PhotoItem[]; pagination: PaginationInfoType }>(
    ["photos", currentPage, limit],
    () =>
      axiosInstance
        .get(`${API_URLS.photos.url}?page=${currentPage}&limit=${limit}`)
        .then((res) => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const photos = data?.items ?? [];
  const paginationInfo = data?.pagination;

  useEffect(() => {
    if (paginationInfo?.lastPage) {
      setLastPageNumber(paginationInfo.lastPage);
    }
  }, [paginationInfo?.lastPage]);

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
      <h3 className={styles["sr-only"]}>현장 작업 사진</h3>
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
