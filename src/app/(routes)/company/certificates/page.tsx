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
                <li className={styles["image-container"]} key={certificate.id}>
                  <Image
                    width={400}
                    height={0}
                    layout="intrinsic"
                    src={certificate.path}
                    alt={`certificate-${certificate.id}`}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <p className={styles["item-title"]}>{certificate.title}</p>
                    <span className={styles["icon-container"]}>
                      <Button
                        color="transparent"
                        onClick={() => onImageModalOpen(certificate)}
                        ariaLabel="자세히 보기"
                      >
                        <RiZoomInLine color="white" size={24} />
                      </Button>
                    </span>
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
