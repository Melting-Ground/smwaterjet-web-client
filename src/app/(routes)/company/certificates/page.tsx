"use client";
import React, { useEffect, useState } from "react";
// import useCertificate from "@/_hooks/useCertificate";
import Image from "next/image";
import styles from "./page.module.scss";
import { RiCloseLine, RiDeleteBinLine, RiZoomInLine } from "@remixicon/react";
import { CertificateType } from "@/_types/certificate";
import Button from "@/_components/Button/Button";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import usePagination from "@/_hooks/usePagination";
import Pagination from "@/_components/Pagination/Pagination";
import useBoardAction from "@/_hooks/useBoardAction";
import useFormData from "@/_hooks/useFormData";
import { useAuth } from "@/_hooks/useAuth";

// TODO: photos 에 있는 스타일과 통일하기
export default function Certificates() {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const { isLoggedIn } = useAuth();

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<CertificateType | null>(
    null
  );
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
  const handleCertificateClick = (certificate: CertificateType) => {
    setSelectedImage(certificate);
    setIsModalOpen(true);
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

    await deleteItem(id.toString());
    const updatedCertificates = certificates?.filter(
      (certificate) => certificate.id !== id
    );
    setDataList(updatedCertificates || []);
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section className={styles.container}>
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
                        onClick={() => handleCertificateClick(certificate)}
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

        {isModalOpen ? (
          <div
            className={styles.modal}
            onClick={() => {
              setIsModalOpen(false);
              setSelectedImage(null);
            }}
          >
            <div className={styles["modal-content"]}>
              <div className={styles["modal-button-container"]}>
                {isLoggedIn ? (
                  <Button
                    className={styles.delete}
                    color="transparent"
                    ariaLabel="삭제하기"
                    onClick={() => handleDeleteFile(selectedImage?.id)}
                  >
                    <RiDeleteBinLine color="white" size={22} />
                  </Button>
                ) : null}
                <Button
                  className={styles.close}
                  color="transparent"
                  ariaLabel="창 닫기"
                >
                  <RiCloseLine color="white" size={24} />
                </Button>
              </div>
              <Image
                src={`${imageBaseUrl}/${selectedImage?.path}`}
                alt={`expanded-certificate-${selectedImage?.id}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
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
