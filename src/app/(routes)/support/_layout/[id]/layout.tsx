"use client";
import styles from "./layout.module.scss";
import React from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "@remixicon/react";
import Link from "next/link";
import { formatDate } from "../../../../_utils/formatDate";
import { downloadFile } from "../../../../_utils/downloadFile";
import Button from "../../../../_components/Button/Button";
import { RiFile2Line } from "@remixicon/react";

interface DetailProps<T> {
  dataDetail: T;
  dataList: T[];
  currentId: number;
  type: "notice" | "inquiry";
}

export default function BoardDetailLayout<T>({
  dataDetail,
  dataList,
  currentId,
  type,
}: DetailProps<T>) {
  // 배열의 인덱스
  const currentIndex = dataList.findIndex((data) => data.id === currentId);
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  return (
    <div className={styles.container}>
      {dataDetail && (
        <article className={styles.article}>
          <h3 className={styles["head-title"]}>{dataDetail.title}</h3>
          <ul className={styles["head-sub"]}>
            <li className={styles["attachment-file"]}>
              <span className={styles.title}>첨부파일</span>
              <span className={styles["info-item"]}>
                {dataDetail.files.length > 0 ? (
                  <span className={styles["file-download"]}>
                    <Button
                      className={styles["file-download-button"]}
                      color="transparent-link"
                      onClick={() => {
                        downloadFile(dataDetail.files[0]);
                      }}
                    >
                      {/* TODO: 색상 넣기 */}
                      <RiFile2Line size={16} color="#75767f" />
                      {dataDetail.files[0].file_path.split("/")[2]}
                    </Button>
                  </span>
                ) : null}
              </span>
            </li>
            <li>
              {/* 공지사항에만 있음 */}
              {type === "notice" ? (
                <>
                  <span className={styles.title}>조회수</span>
                  <span className={styles["info-item"]}>
                    {dataDetail.count}
                  </span>
                </>
              ) : null}
            </li>
            <li>
              <span className={styles.title}>작성일</span>
              <span className={styles["info-item"]}>
                <time dateTime={dataDetail.created_at}>
                  {formatDate(dataDetail.created_at)}
                </time>
              </span>
            </li>
          </ul>
          <p className={styles.content}>{dataDetail.content}</p>
          <ul className={styles.nav}>
            <li className={styles["nav-item"]}>
              <span>
                <p>이전글</p>
                <RiArrowUpSFill size={18} />
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <Link href={`/support/${type}/${dataList[previousIndex].id}`}>
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
                <RiArrowDownSFill size={18} />
              </span>
              <span>
                {nextIndex < dataList.length ? (
                  <Link href={`/support/${type}/${dataList[nextIndex].id}`}>
                    {dataList[nextIndex].title}
                  </Link>
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
    </div>
  );
}
