"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react";
import Pagination from "@/_components/Pagination/Pagination";
import styles from "./page.module.scss";

const ITEMS_PER_PAGE = 9;

export interface WorkMedia {
  name: string;
  src: string;
  thumbnailSrc: string;
  type: "image" | "video";
}

interface PhotoGridProps {
  media: WorkMedia[];
}

export default function PhotoGrid({ media }: PhotoGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : media[selectedIndex];
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerOpen = selected !== null && selected !== undefined;
  const totalPages = Math.ceil(media.length / ITEMS_PER_PAGE);
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleMedia = media.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeViewer = () => setSelectedIndex(null);
  const showPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + media.length) % media.length);
  };
  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % media.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.target instanceof HTMLVideoElement) return;
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + media.length) % media.length
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % media.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [media.length, selectedIndex]);

  useEffect(() => {
    if (!viewerOpen || !viewerRef.current) return;
    const viewer = viewerRef.current;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    viewer.querySelector<HTMLButtonElement>("button")?.focus();
    const keepFocus = (event: FocusEvent) => {
      if (!viewer.contains(event.target as Node)) viewer.focus();
    };
    const trapTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(viewer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], video[controls], [tabindex="0"]'
      ));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === viewer)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === viewer)) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("focusin", keepFocus);
    viewer.addEventListener("keydown", trapTab);
    return () => {
      document.removeEventListener("focusin", keepFocus);
      viewer.removeEventListener("keydown", trapTab);
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, [viewerOpen]);

  return (
    <div className={styles["photo-grid"]}>
      <ul className={styles.gallery}>
        {visibleMedia.map((item, index) => (
          <li key={item.name} className={styles["media-item"]}>
            <button
              type="button"
              className={styles["media-button"]}
              onClick={() => setSelectedIndex(pageStart + index)}
              aria-label={`${pageStart + index + 1}번째 현장 ${item.type === "video" ? "영상 재생" : "사진 크게 보기"}`}
            >
              {item.type === "video" && item.thumbnailSrc === item.src ? (
                <video className={styles.media} muted preload="none" src={item.src} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.media}
                  src={item.thumbnailSrc}
                  alt={item.type === "video" ? "현장 작업 영상 썸네일" : "현장 작업 사진"}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
              )}
              <span className={`${styles["zoom-indicator"]} ${item.type === "video" ? styles["play-indicator"] : ""}`} aria-hidden="true">
                {item.type === "video" ? <Play size={30} strokeWidth={2} /> : <ZoomIn size={30} strokeWidth={2} />}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {totalPages > 1 ? (
        <div className={styles["pagination-wrap"]}>
          <Pagination
            pages={Array.from({ length: totalPages }, (_, index) => index + 1)}
            currentPage={currentPage}
            handlePrevArrowClick={() =>
              changePage(Math.max(1, currentPage - 1))
            }
            handleNextArrowClick={() =>
              changePage(Math.min(totalPages, currentPage + 1))
            }
            handlePageButtonClick={(event) =>
              changePage(Number(event.currentTarget.value))
            }
          />
        </div>
      ) : null}

      {selected ? (
        <div
          className={styles.viewer}
          ref={viewerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="현장 사진 확대 보기"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeViewer();
          }}
        >
          <button
            type="button"
            className={styles["viewer-close"]}
            onClick={closeViewer}
            aria-label="확대 보기 닫기"
          >
            <X size={32} />
          </button>

          {media.length > 1 ? (
            <button
              type="button"
              className={`${styles["viewer-arrow"]} ${styles["viewer-prev"]}`}
              onClick={showPrevious}
              aria-label="이전 사진"
            >
              <ChevronLeft size={40} />
            </button>
          ) : null}

          <div className={styles["viewer-content"]}>
            {selected.type === "video" ? (
              <video key={selected.src} className={styles["viewer-media"]} controls autoPlay playsInline
                poster={selected.thumbnailSrc !== selected.src ? selected.thumbnailSrc : undefined}
                preload="metadata">
                <source src={selected.src} />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles["viewer-media"]}
                src={selected.src}
                alt="확대된 현장 작업 사진"
              />
            )}
          </div>

          {media.length > 1 ? (
            <button
              type="button"
              className={`${styles["viewer-arrow"]} ${styles["viewer-next"]}`}
              onClick={showNext}
              aria-label="다음 사진"
            >
              <ChevronRight size={40} />
            </button>
          ) : null}

          <span className={styles["viewer-count"]}>
            {selectedIndex! + 1} / {media.length}
          </span>
        </div>
      ) : null}
    </div>
  );
}
