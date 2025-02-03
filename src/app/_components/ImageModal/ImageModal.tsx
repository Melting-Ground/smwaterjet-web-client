import React, { Dispatch, SetStateAction } from "react";
import styles from "./imageModal.module.scss";
import { RiCloseLine, RiDeleteBinLine } from "@remixicon/react";
import Button from "../Button/Button";
import Image from "next/image";
import { PhotoType } from "@/_types/photo";
import { CertificateType } from "@/_types/certificate";

interface ImageModalProps {
  isLoggedIn: boolean;
  handleDeleteFile: (id: number | undefined) => void;
  handleImageModalClose: () => void;
  selectedImage: CertificateType | PhotoType | null;
}

export default function ImageModal({
  isLoggedIn,
  handleDeleteFile,
  handleImageModalClose,
  selectedImage,
}: ImageModalProps) {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <article className={styles.modal} onClick={handleImageModalClose}>
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
          alt={`expanded-${selectedImage?.id}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </article>
  );
}
