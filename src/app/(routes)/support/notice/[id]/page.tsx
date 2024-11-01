"use client";
import styles from "./page.module.scss";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../_config/axiosInstance";
import { NoticeType } from "../../../../_types/notice";
import useNotices from "../../../../_hooks/useNotices";
import { RiArrowUpSFill, RiArrowDownSFill } from "@remixicon/react";
import Link from "next/link";
export default function NoticeDetail() {
  const [noticeDetail, setNoticeDetail] = useState<NoticeType>();
  const { notices } = useNotices();
  console.log("notices", notices);
  // 조회수
  const { id } = useParams();
  // const previousId = notices[id]

  // 배열의 인덱스
  const currentIndex = notices.findIndex((notice) => notice.id === Number(id));
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  console.log(notices[previousIndex]?.title);
  console.log(notices[nextIndex]?.title);

  // TODO: 훅으로 관리하기
  const fetchNotice = async () => {
    try {
      const { data } = await axiosInstance.get(`/support/notices/${id}`);
      console.log(data);
      setNoticeDetail(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchNotice();
  }, []);

  return (
    <div className={styles.container}>
      {noticeDetail && (
        <article className={styles["notice-article"]}>
          <h3 className={styles["head-title"]}>{noticeDetail.title}</h3>
          <ul className={styles["head-sub"]}>
            <li>
              <span className={styles.title}>첨부파일</span>
              <span className={styles["info-item"]}>
                {noticeDetail.files[0].file_path.split("/")[2]}
              </span>
            </li>
            <li>
              <span className={styles.title}>조회수</span>
              <span className={styles["info-item"]}>110</span>
            </li>
            <li>
              <span className={styles.title}>작성일</span>
              <span className={styles["info-item"]}>
                <time dateTime={noticeDetail.created_at}>
                  {noticeDetail.created_at.substring(0, 10)}
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
                  <Link href={`/support/notice/${notices[previousIndex].id}`}>
                    {notices[previousIndex].title}
                  </Link>
                ) : (
                  "이전 글이 없습니다."
                )}
              </span>
              <span>
                {previousIndex >= 0
                  ? notices[previousIndex].created_at.substring(0, 10)
                  : ""}
              </span>
            </li>
            <li className={styles["notice-nav-item"]}>
              <span>
                <p>다음글</p>
                <RiArrowDownSFill size={18} />
              </span>
              <span>
                {nextIndex < notices.length ? (
                  <Link href={`/support/notice/${notices[nextIndex].id}`}>
                    {notices[nextIndex].title}
                  </Link>
                ) : (
                  "다음 글이 없습니다."
                )}
              </span>
              <span>
                {nextIndex < notices.length
                  ? notices[nextIndex].created_at.substring(0, 10)
                  : ""}
              </span>
            </li>
          </ul>
        </article>
      )}
    </div>
  );
}
