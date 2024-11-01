"use client";
import styles from "./page.module.scss";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../_config/axiosInstance";
import { NoticeType } from "../../../../_types/notice";
import { useRouter } from "next/router";

export default function NoticeDetail() {
  const [noticeDetail, setNoticeDetail] = useState<NoticeType>();

  // 조회수
  const { id } = useParams();

  // let noticeList: NoticeType[] = [];
  // if (Array.isArray(notices)) {
  //   noticeList = JSON.parse(notices);
  // }

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
        </article>
      )}
    </div>
  );
}
