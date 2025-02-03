"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import { RiZoomInLine } from "@remixicon/react";
import Button from "@/_components/Button/Button";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import usePagination from "@/_hooks/usePagination";
import Pagination from "@/_components/Pagination/Pagination";
import useBoardAction from "@/_hooks/useBoardAction";
import useFormData from "@/_hooks/useFormData";
import { useAuth } from "@/_hooks/useAuth";
import ImageModal from "@/_components/ImageModal/ImageModal";
import { useImageModal } from "@/_hooks/useImageModal";

// TODO: photos 에 있는 스타일과 통일하기
export default function Certificates() {
  const { isLoggedIn } = useAuth();
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const {
    dataList: certificates,
    paginationInfo,
    fetchDataList,
    setDataList,
  } = useAPIData<typeof API_URLS.certificates.method.get>(
    API_URLS.certificates
  );
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

  const {
    onImageModalOpen,
    onImageModalClose,
    isImageModalOpen,
    selectedImage,
  } = useImageModal();

  const handlePrevArrowClick = () => {
    clickArrowButton("prev");
  };
  const handleNextArrowClick = () => {
    clickArrowButton("next");
  };
  const handlePageButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value;
    clickPageButton(Number(value));
  };

  const { goToEditPage } = useBoardAction("company", "certificates");

  const handleEditClick = () => {
    goToEditPage();
  };

  console.log(certificates);

  const { deleteItem } = useFormData(API_URLS.certificates);
  const handleDeleteFile = async (id: number | undefined) => {
    if (!id) {
      return;
    }
    const deleted = await deleteItem(id.toString());
    if (deleted) {
      const updatedCertificates = certificates?.filter(
        (certificate) => certificate.id !== id
      );
      setDataList(updatedCertificates || []);
      // setIsImageModalOpen(false);
      // setSelectedImage(null);
    }
  };

  return (
    <section className={styles.container}>
      <h3 className={styles["sr-only"]}>인증 및 특허</h3>
      <div className={styles["certificates-container"]}>
        {isLoggedIn ? (
          <Button
            ariaLabel="글쓰기"
            onClick={() => handleEditClick()}
            color="primary"
            className={styles["write-button"]}
          >
            글쓰기
          </Button>
        ) : null}
        <ol className={styles.certificates}>
          {certificates && certificates.length > 0
            ? certificates.map((certificate) => (
                <li className={styles["image-container"]} key={certificate.id}>
                  <Image
                    width={400}
                    height={0}
                    layout="intrinsic"
                    src={`${imageBaseUrl}/${certificate.path}`}
                    alt={`certificate-${certificate.id}`}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <p className={styles["item-title"]}>{certificate.title}</p>
                    <span className={styles["icon-container"]}>
                      <Button
                        color="transparent"
                        onClick={() => onImageModalOpen(certificate)}
                        ariaLabel="크게 보기"
                      >
                        <RiZoomInLine color="white" size={24} />
                      </Button>
                    </span>
                  </div>
                </li>
              ))
            : null}
        </ol>

        {/* 중복: 훅으로 분리 등 */}
        {isImageModalOpen ? (
          <ImageModal
            handleImageModalClose={onImageModalClose}
            isLoggedIn={isLoggedIn}
            handleDeleteFile={handleDeleteFile}
            selectedImage={selectedImage}
          />
        ) : null}
        <Pagination
          currentPage={currentPage}
          pages={pages}
          handlePageButtonClick={handlePageButtonClick}
          handlePrevArrowClick={handlePrevArrowClick}
          handleNextArrowClick={handleNextArrowClick}
        />
      </div>
    </section>
  );
}
