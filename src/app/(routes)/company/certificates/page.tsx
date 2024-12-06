"use client";
import React, { useState } from "react";
import useCertificate from "@/_hooks/useCertificate";
import Image from "next/image";
import styles from "./page.module.scss";
import { motion } from "framer-motion";
import { RiCloseLine, RiZoomInLine } from "@remixicon/react";
import { CertificateType } from "@/_types/certificate";
import Button from "@/_components/Button/Button";

export default function Certificates() {
  // TODO: photos 에 있는 스타일과 통일하기
  const { certificates, isLoading } = useCertificate();
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<CertificateType | null>(
    null
  );

  return (
    <section className={styles.container}>
      <div className={styles.certificates}>
        {/* <Link href={"/company/certificates/edit"}>글쓰기</Link> */}
        {!isLoading && certificates && certificates.length > 0
          ? certificates.map((certificate) => (
              <div
                className={styles["image-container"]}
                key={certificate.id}
                onClick={() => {
                  setSelectedImage(certificate);
                  setIsModalOpen(true);
                }}
              >
                <motion.div
                  className={styles["overlay"]}
                  whileHover={{ opacity: 0.5 }}
                >
                  <RiZoomInLine color="white" size={30} />
                </motion.div>
                <Image
                  width={400}
                  height={0}
                  layout="intrinsic"
                  src={`${imageBaseUrl}/${certificate.path}`}
                  alt={`certificate-${certificate.id}`}
                  className={styles.image}
                />
              </div>
            ))
          : null}
      </div>

      {isModalOpen ? (
        <div
          className={styles.modal}
          onClick={() => {
            setIsModalOpen(false);
            setSelectedImage(null);
          }}
        >
          <div className={styles["modal-content"]}>
            <Button className={styles.close}>
              <RiCloseLine color="white" size={24} />
            </Button>
            <Image
              src={`${imageBaseUrl}/${selectedImage?.path}`}
              alt={`expanded-certificate-${selectedImage?.id}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
