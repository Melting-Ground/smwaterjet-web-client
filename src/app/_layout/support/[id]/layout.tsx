"use client";
import styles from "./layout.module.scss";
import React from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "@remixicon/react";
import Link from "next/link";
import { downloadFile } from "@/_utils/downloadFile";
import Button from "@/_components/Button/Button";
import { RiFile2Line } from "@remixicon/react";
import { NoticeType } from "@/_types/notice";
import { InquiryType } from "@/_types/inquiry";
import { BoardType } from "@/_types/board";
import { formatDate } from "@/_utils/formatDate";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DetailProps<T> {
  dataDetail: T;
  dataList: T[];
  currentId: number;
  boardType: BoardType;
  hasPermission: boolean;
  handleDelete: (id: string) => void;
  handleEditClick: () => void;
  handleListClick: () => void;
}
// TODO: 이전글, 다음글 컴포넌트 분리하기
export default function BoardDetailLayout<T extends NoticeType | InquiryType>({
  dataDetail,
  dataList,
  currentId,
  boardType,
  hasPermission,
  handleDelete,
  handleEditClick,
  handleListClick,
}: DetailProps<T>) {
  const isImageFile = (path?: string) => {
    if (!path) return false;
    const ext = path.split(".").pop()?.toLowerCase() || "";
    return ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(ext);
  };

  const buildFileUrl = (path?: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${base}/${cleanPath}`;
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
  const router = useRouter();
  const currentIndex = dataList.findIndex((data) => data.id === currentId);
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  const previousLink =
    boardType === "inquiry"
      ? `/support/${boardType}/${dataList[previousIndex]?.id}/password`
      : `/support/${boardType}/${dataList[previousIndex]?.id}`;
  const nextLink =
    boardType === "inquiry"
      ? `/support/${boardType}/${dataList[nextIndex]?.id}/password`
      : `/support/${boardType}/${dataList[nextIndex]?.id}`;

  const handlePrevLinkClick = () => {
    if (previousIndex < 0) return;
    router.push(previousLink);
  };

  const handleNextLinkClick = () => {
    if (nextIndex >= dataList.length) return;
    router.push(nextLink);
  };

  return (
    <div className={styles.container}>
      {dataDetail && (
        <article className={styles.article}>
          <div className={styles["head-title-block"]}>
            <h3 className={styles["head-title"]}>{dataDetail.title}</h3>
            <div className={styles["head-meta"]}>
              <time
                className={styles["head-date"]}
                dateTime={dataDetail.created_at}
              >
                {formatDateTime(dataDetail.created_at)}
              </time>
              {"phone_number" in dataDetail ? (
                <>
                  <span className={styles["head-meta-item"]}>
                    작성자: {dataDetail.author}
                  </span>
                  {dataDetail.phone_number ? (
                    <span className={styles["head-meta-item"]}>
                      연락처: {dataDetail.phone_number}
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
          <div className={styles["head-divider"]} />
          <ul className={styles["head-sub"]}>
            <li className={styles["attachment-file"]}>
              <span className={styles.title}>첨부파일</span>
              <span className={styles["info-item"]}>
                {(dataDetail.files?.length ?? 0) > 0
                  ? (dataDetail.files ?? [])
                      .filter((file) => !isImageFile(file.file_path))
                      .map((file, index) => (
                        <span key={index} className={styles["file-download"]}>
                          <Button
                            ariaLabel="파일 다운로드하기"
                            className={styles["file-download-button"]}
                            color="transparent-link"
                            onClick={() => {
                              downloadFile(file); // 각 파일에 대한 다운로드 함수 호출
                            }}
                          >
                            <RiFile2Line size={16} color="#75767f" />
                            {file.file_path.split("/").pop()}{" "}
                            {/* 파일 경로에서 파일명 추출 */}
                          </Button>
                        </span>
                      ))
                  : "첨부파일 없음"}
              </span>
            </li>
          </ul>
          <p className={styles.content}>{dataDetail.content}</p>
          {(dataDetail.files ?? []).some((file) =>
            isImageFile(file.file_path)
          ) ? (
            <ul className={styles["image-list"]}>
              {(dataDetail.files ?? [])
                .filter((file) => isImageFile(file.file_path))
                .map((file, index) => {
                  const src = buildFileUrl(file.file_path);
                  return (
                    <li key={`${file.id}-${index}`} className={styles["image-item"]}>
                      <div className={styles["image-frame"]}>
                        {src ? (
                          <Image
                            src={src}
                            alt={`attachment-${file.id}`}
                            fill
                            sizes="(min-width: 1200px) 900px, 90vw"
                            className={styles.image}
                          />
                        ) : null}
                      </div>
                    </li>
                  );
                })}
            </ul>
          ) : null}
          <ul className={styles.nav}>
            <li className={styles["nav-item"]}>
              <span>
                <p>이전글</p>
                <Button
                  ariaLabel="이전글"
                  className={styles.arrow}
                  icon={<RiArrowUpSFill size={18} />}
                  color="transparent"
                  onClick={handlePrevLinkClick}
                />
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <Link href={previousLink}>
                    {dataList[previousIndex].title}
                  </Link>
                ) : (
                  "이전 글이 없습니다."
                )}
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <time dateTime={dataList[previousIndex].created_at}>
                    {formatDate(dataList[previousIndex].created_at)}
                  </time>
                ) : (
                  ""
                )}
              </span>
            </li>
            <li className={styles["nav-item"]}>
              <span>
                <p>다음글</p>
                <Button
                  ariaLabel="다음글"
                  className={styles.arrow}
                  icon={<RiArrowDownSFill size={18} />}
                  color="transparent"
                  onClick={handleNextLinkClick}
                />
              </span>
              <span>
                {nextIndex < dataList.length ? (
                  <Link href={nextLink}>{dataList[nextIndex].title}</Link>
                ) : (
                  "다음 글이 없습니다."
                )}
              </span>
              <span>
                {nextIndex < dataList.length ? (
                  <time dateTime={dataList[nextIndex].created_at}>
                    {formatDate(dataList[nextIndex].created_at)}
                  </time>
                ) : (
                  ""
                )}
              </span>
            </li>
          </ul>
        </article>
      )}

      {/* TODO: PrevNextLinks 등으로 컴포넌트 분리하기 */}
      <span className={styles["button-container"]}>
        <Button
          ariaLabel="목록으로"
          color="primary"
          className={styles["to-list-button"]}
          onClick={handleListClick}
        >
          목록으로
        </Button>
        {hasPermission ? (
          <span className={styles["edit-del-button-container"]}>
            <Button
              ariaLabel="수정하기"
              color="primary-border"
              onClick={handleEditClick}
            >
              수정
            </Button>
            <Button
              ariaLabel="삭제하기"
              color="red"
              onClick={() => handleDelete(currentId.toString())}
            >
              삭제
            </Button>
          </span>
        ) : null}
      </span>
    </div>
  );
}
