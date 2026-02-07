import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragBounds, setDragBounds] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const dragState = React.useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });

  useEffect(() => {
    setActiveIndex(0);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [selectedImage?.id]);

  const buildImageUrl = useCallback(
    (path?: string) => {
      if (!path) return "";
      if (path.startsWith("http")) return path;
      if (path.startsWith("/images/")) return path;
      if (!imageBaseUrl) return path.startsWith("/") ? path : `/${path}`;
      const base = imageBaseUrl.endsWith("/")
        ? imageBaseUrl.slice(0, -1)
        : imageBaseUrl;
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      return `${base}/${cleanPath}`;
    },
    [imageBaseUrl]
  );

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
  }, [selectedImage, filePaths, activeIndex, buildImageUrl]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const updateBounds = () => {
      const frame = frameRef.current;
      const box = imageBoxRef.current;
      if (!frame || !box) {
        setDragBounds({ x: 0, y: 0 });
        return;
      }
      const frameRect = frame.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      const maxX = Math.max(0, (boxRect.width * zoom - frameRect.width) / 2);
      const maxY = Math.max(0, (boxRect.height * zoom - frameRect.height) / 2);
      setDragBounds({ x: maxX, y: maxY });
      setOffset((prev) => ({
        x: Math.max(-maxX, Math.min(maxX, prev.x)),
        y: Math.max(-maxY, Math.min(maxY, prev.y)),
      }));
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [zoom, src]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) {
      return;
    }
    event.preventDefault();
    setZoom((prev) => {
      const next = prev + (event.deltaY > 0 ? -0.1 : 0.1);
      const clamped = Math.min(3, Math.max(1, Number(next.toFixed(2))));
      if (clamped === 1) {
        setOffset({ x: 0, y: 0 });
      }
      return clamped;
    });
  };

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) {
      return;
    }
    event.preventDefault();
    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      startY: event.clientY,
      baseX: offset.x,
      baseY: offset.y,
    };
  };

  const handleDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) {
      return;
    }
    const dx = (event.clientX - dragState.current.startX) / zoom;
    const dy = (event.clientY - dragState.current.startY) / zoom;
    const nextX = dragState.current.baseX + dx;
    const nextY = dragState.current.baseY + dy;
    setOffset({
      x: Math.max(-dragBounds.x, Math.min(dragBounds.x, nextX)),
      y: Math.max(-dragBounds.y, Math.min(dragBounds.y, nextY)),
    });
  };

  const handleDragEnd = () => {
    dragState.current.isDragging = false;
  };

  return (
    <article className={styles.modal} onClick={handleImageModalClose}>
      <div
        className={styles["modal-content"]}
        onClick={handleImageModalClose}
        onWheel={handleWheel}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div
          className={styles["modal-button-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          {isLoggedIn ? (
            <Button
              className={styles.delete}
              color="transparent"
              ariaLabel="Delete"
              onClick={() => handleDeleteFile(selectedImage?.id)}
            >
              <RiDeleteBinLine color="white" size={22} />
            </Button>
          ) : null}
          <Button
            className={styles.close}
            color="transparent"
            ariaLabel="Close"
            onClick={handleImageModalClose}
          >
            <RiCloseLine color="white" size={24} />
          </Button>
        </div>
        <div className={styles["modal-body"]}>
          <div className={styles["image-frame"]} ref={frameRef}>
            {src ? (
              <div
                className={styles["image-box"]}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleDragStart}
                ref={imageBoxRef}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  cursor:
                    zoom > 1
                      ? dragState.current.isDragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                }}
              >
                <Image
                  src={src}
                  alt={`expanded-${selectedImage?.id}`}
                  fill
                  sizes="90vw"
                  className={styles.image}
                />
              </div>
            ) : null}
          </div>
          {filePaths.length > 1 ? (
            <ul
              className={styles.thumbnails}
              onClick={(e) => e.stopPropagation()}
            >
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
      </div>
    </article>
  );
}
