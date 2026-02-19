"use client";
import React, { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";
import { API_URLS } from "@/_config/apiConfig";
import Button from "@/_components/Button/Button";
import { useAuth } from "@/_hooks/useAuth";
import useFormData from "@/_hooks/useFormData";
import useSWR from "swr";
import axiosInstance from "@/_config/axiosInstance";
import LoadingState from "@/_components/LoadingState/LoadingState";

export default function PhotoDetail() {
  const { id } = useParams();
  const router = useRouter();
  const currentId = typeof id === "string" ? id : undefined;
  const searchParams = useSearchParams();
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  type PhotoItem = typeof API_URLS.photos.method.get;
  const { data: dataDetail, isValidating } = useSWR<PhotoItem>(
    currentId ? ["photo-detail", currentId] : null,
    () =>
      axiosInstance
        .get(`${API_URLS.photos.url}/${currentId}`)
        .then((res) => res.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const { isLoggedIn } = useAuth();
  const { deleteItem } = useFormData(API_URLS.photos);

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

  const isVideoFile = (path?: string) => {
    if (!path) return false;
    const ext = path.split(".").pop()?.toLowerCase() || "";
    return ["mp4", "webm", "ogg"].includes(ext);
  };

  const formatDateTime = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const filePaths = useMemo(() => {
    if (!dataDetail) return [];
    if (dataDetail.files && dataDetail.files.length > 0) {
      return dataDetail.files.map((file) => file.file_path);
    }
    if (dataDetail.path) return [dataDetail.path];
    if (dataDetail.thumbnail_path) return [dataDetail.thumbnail_path];
    return [];
  }, [dataDetail]);

  if (!currentId) {
    return <div>해당 사진 정보를 찾을 수 없습니다.</div>;
  }

  if (isValidating || !dataDetail) {
    return <LoadingState />;
  }

  const handleEditClick = () => {
    router.push(`/business/photos/${dataDetail.id}/edit`);
  };

  const listQuery = searchParams.toString();
  const listUrl = listQuery
    ? `/business/photos?${listQuery}`
    : "/business/photos";

  const handleDeleteClick = async () => {
    const deleted = await deleteItem(String(dataDetail.id));
    if (deleted) {
      router.push(listUrl);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{dataDetail.title}</h1>
        <p className={styles.meta}>{formatDateTime(dataDetail.created_at)}</p>
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <ul className={styles.images}>
        {filePaths.map((path, index) => {
          const src = buildImageUrl(path);
          const isVideo = isVideoFile(path);
          return (
            <li key={`${dataDetail.id}-${index}`} className={styles.imageItem}>
              <div className={styles.imageFrame}>
                {src ? (
                  isVideo ? (
                    <video
                      className={styles.video}
                      controls
                      preload="metadata"
                    >
                      <source src={src} />
                    </video>
                  ) : (
                    <Image
                      src={src}
                      alt={`${dataDetail.title}-${index + 1}`}
                      fill
                      sizes="90vw"
                      className={styles.image}
                    />
                  )
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.actions}>
        {isLoggedIn ? (
          <div className={styles["admin-actions"]}>
            <Button
              ariaLabel="수정"
              type="button"
              color="primary-border"
              onClick={handleEditClick}
            >
              수정
            </Button>
            <Button
              ariaLabel="삭제"
              type="button"
              color="red"
              onClick={handleDeleteClick}
            >
              삭제
            </Button>
          </div>
        ) : null}
        <Button
          ariaLabel="목록으로"
          type="button"
          color="primary"
          className={styles["go-list-button"]}
          onClick={() => router.push(listUrl)}
        >
          목록으로
        </Button>
      </div>
    </section>
  );
}
