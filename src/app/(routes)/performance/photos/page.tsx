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
import { useImageModal } from "@/_hooks/useImageModal";
import ImageModal from "@/_components/ImageModal/ImageModal";
import useFormData from "@/_hooks/useFormData";
// 현장 사진
export default function Photos() {
  const boardType = "photos";

  const { goToEditPage } = useBoardAction("performance", boardType);

  const {
    dataList: photos,
    paginationInfo,
    fetchDataList,
    setDataList,
  } = useAPIData<typeof API_URLS.photos.method.get>(API_URLS.photos);

  console.log(photos);
  const lastPageNumber = paginationInfo?.lastPage || 1;

  const { deleteItem } = useFormData(API_URLS.photos);
  const handleDeleteFile = async (id: number | undefined) => {
    if (!id) {
      return;
    }
    const deleted = await deleteItem(id.toString());
    if (deleted) {
      const updatedPhotos = photos?.filter((photo) => photo.id !== id);
      setDataList(updatedPhotos || []);
      // setIsImageModalOpen(false);
      // setSelectedImage(null);
    }
  };

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
  const {
    onImageModalOpen,
    onImageModalClose,
    isImageModalOpen,
    selectedImage,
  } = useImageModal();

  return (
    <section className={styles.container}>
      <h3 className={styles["sr-only"]}>현장 작업 사진</h3>
      <div className={styles["photos-container"]}>
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
          handleItemClick={onImageModalOpen}
          // 페이지네이션
          pages={pages}
          handleArrowClick={clickArrowButton}
          handlePageClick={clickPageButton}
          currentPage={currentPage}
        />
        {isImageModalOpen ? (
          <ImageModal
            handleImageModalClose={onImageModalClose}
            isLoggedIn={isLoggedIn}
            handleDeleteFile={handleDeleteFile}
            selectedImage={selectedImage}
          />
        ) : null}
      </div>
    </section>
  );
}
