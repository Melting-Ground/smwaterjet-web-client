import React, { useEffect, useMemo, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedImage?.id]);

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

  const filePaths = useMemo(() => {
    if (!selectedImage) return [];
    if (!("files" in selectedImage)) return [];
    return (selectedImage.files || []).map((file) => file.file_path);
  }, [selectedImage]);

  const src = useMemo(() => {
    if (!selectedImage) return "";
    if (filePaths.length > 0) {
      return buildImageUrl(filePaths[activeIndex] || filePaths[0]);
    }
    if ("path" in selectedImage && selectedImage.path) {
      return buildImageUrl(selectedImage.path);
    }
    if ("thumbnail_path" in selectedImage) {
      return buildImageUrl(selectedImage.thumbnail_path);
    }
    return "";
  }, [selectedImage, filePaths, activeIndex]);

  return (
    <article className={styles.modal} onClick={handleImageModalClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
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
        <div className={styles["image-frame"]}>
          {src ? (
            <Image
              src={src}
              alt={`expanded-${selectedImage?.id}`}
              fill
              sizes="90vw"
              className={styles.image}
            />
          ) : null}
        </div>
        {filePaths.length > 1 ? (
          <ul className={styles.thumbnails}>
            {filePaths.map((path, index) => {
              const thumbSrc = buildImageUrl(path);
              return (
                <li key={`${selectedImage?.id}-${path}-${index}`}>
                  <button
                    type="button"
                    className={`${styles.thumb} ${
                      index === activeIndex ? styles.active : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {thumbSrc ? (
                      <Image
                        src={thumbSrc}
                        alt={`thumbnail-${selectedImage?.id}-${index}`}
                        fill
                        sizes="80px"
                        className={styles["thumb-image"]}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
