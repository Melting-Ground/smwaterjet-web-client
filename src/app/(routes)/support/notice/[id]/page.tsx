"use client";
import styles from "./page.module.scss";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect } from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "@remixicon/react";
import Link from "next/link";
import { formatDate } from "../../../../_utils/formatDate";
import { API_URLS } from "../../../../_config/apiConfig";
import { useAPIData } from "../../../../_hooks/useAPIData";
import { downloadFile } from "../../../../_utils/downloadFile";
import Button from "../../../../_components/Button/Button";
import { RiFile2Line } from "@remixicon/react";

export default function NoticeDetail() {
  // TODO: 조회수 추가하기
  const {
    fetchData: fetchNoticeDetail,
    dataList: noticeList,
    dataDetail: noticeDetail,
  } = useAPIData<typeof API_URLS.notices.method.get>(API_URLS.notices);

  const { id } = useParams();
  useEffect(() => {
    if (typeof id === "string") {
      fetchNoticeDetail(id);
    }
  }, [id]);

  // 배열의 인덱스
  const currentIndex = noticeList.findIndex(
    (notice) => notice.id === Number(id)
  );
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  return (
    <div className={styles.container}>
      {noticeDetail && (
        <article className={styles["notice-article"]}>
          <h3 className={styles["head-title"]}>{noticeDetail.title}</h3>
          <ul className={styles["head-sub"]}>
            <li className={styles["attachment-file"]}>
              <span className={styles.title}>첨부파일</span>
              <span className={styles["info-item"]}>
                {noticeDetail.files.length > 0 ? (
                  <span className={styles["file-download"]}>
                    <Button
                      className={styles["file-download-button"]}
                      color="transparent-link"
                      onClick={() => {
                        downloadFile(noticeDetail.files[0]);
                      }}
                    >
                      {/* TODO: 색상 넣기 */}
                      <RiFile2Line size={16} />
                      {noticeDetail.files[0].file_path.split("/")[2]}
                    </Button>
                  </span>
                ) : null}
              </span>
            </li>
            <li>
              <span className={styles.title}>조회수</span>
              <span className={styles["info-item"]}>{noticeDetail.count}</span>
            </li>
            <li>
              <span className={styles.title}>작성일</span>
              <span className={styles["info-item"]}>
                <time dateTime={noticeDetail.created_at}>
                  {formatDate(noticeDetail.created_at)}
                </time>
              </span>
            </li>
          </ul>
          <p className={styles.content}>{noticeDetail.content}</p>
          <ul className={styles["notice-nav"]}>
            <li className={styles["notice-nav-item"]}>
              <span>
                <p>이전글</p>
                <RiArrowUpSFill size={18} />
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <Link
                    href={`/support/notice/${noticeList[previousIndex].id}`}
                  >
                    {noticeList[previousIndex].title}
                  </Link>
                ) : (
                  "이전 글이 없습니다."
                )}
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <time dateTime={noticeList[previousIndex].created_at}>
                    {formatDate(noticeList[previousIndex].created_at)}
                  </time>
                ) : (
                  ""
                )}
              </span>
            </li>
            <li className={styles["notice-nav-item"]}>
              <span>
                <p>다음글</p>
                <RiArrowDownSFill size={18} />
              </span>
              <span>
                {nextIndex < noticeList.length ? (
                  <Link href={`/support/notice/${noticeList[nextIndex].id}`}>
                    {noticeList[nextIndex].title}
                  </Link>
                ) : (
                  "다음 글이 없습니다."
                )}
              </span>
              <span>
                {nextIndex < noticeList.length ? (
                  <time dateTime={noticeList[nextIndex].created_at}>
                    {formatDate(noticeList[nextIndex].created_at)}
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
