"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import { RiZoomInLine } from "@remixicon/react";
import Button from "@/_components/Button/Button";
import ImageModal from "@/_components/ImageModal/ImageModal";
import { useImageModal } from "@/_hooks/useImageModal";
import { useLocalData } from "@/_hooks/useLocalData";
import { CertificateType } from "@/_types/certificate";

export default function Certificates() {
  const { data: certificates } =
    useLocalData<CertificateType[]>("certificates");
  const {
    onImageModalOpen,
    onImageModalClose,
    isImageModalOpen,
    selectedImage,
  } = useImageModal();

  return (
    <section className={styles.container}>
      <h3 className={styles["sr-only"]}>인증 및 특허</h3>
      <div className={styles["certificates-container"]}>
        <p className={styles["intro-text"]}>
          다양한 인증서와 특허를 통해 성문워터젯의 기술력을 증명합니다.
        </p>
        <div className={styles.divider} aria-hidden="true" />
        <ol className={styles.certificates}>
          {certificates && certificates.length > 0
            ? certificates.map((certificate) => (
                <li className={styles.card} key={certificate.id}>
                  <div className={styles.header}>
                    <span className={styles.label}>특허명</span>
                    <span className={styles.title}>{certificate.title}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.preview}
                    onClick={() => onImageModalOpen(certificate)}
                    aria-label="미리보기 확대"
                  >
                    <Image
                      width={520}
                      height={0}
                      layout="intrinsic"
                      src={certificate.path}
                      alt={`certificate-${certificate.id}`}
                      className={styles.image}
                    />
                    <span className={styles["preview-overlay"]}>
                      <RiZoomInLine color="white" size={24} />
                    </span>
                  </button>
                  <div className={styles.meta}>
                    <span className={styles["meta-label"]}>등록일</span>
                    <span className={styles["meta-value"]}>
                      {certificate.registeredAt || "미기재"}
                    </span>
                  </div>
                  <div className={styles.actions}>
                    <Button
                      color="primary-border"
                      onClick={() => onImageModalOpen(certificate)}
                      ariaLabel="상세 보기"
                    >
                      상세 보기
                    </Button>
                  </div>
                </li>
              ))
            : null}
        </ol>

        {isImageModalOpen ? (
          <ImageModal
            handleImageModalClose={onImageModalClose}
            isLoggedIn={false}
            handleDeleteFile={() => {}}
            selectedImage={selectedImage}
          />
        ) : null}
      </div>
    </section>
  );
}
