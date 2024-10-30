"use client";
import styles from "./page.module.scss";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../_config/axiosInstance";

export default function NoticeDetail() {
  const [noticeDetail, setNoticeDetail] = useState();
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

  const { id } = useParams();
  console.log(id);
  return (
    <div className={styles.container}>
      {noticeDetail && (
        <div>
          <p>{noticeDetail.title}</p>
          <p>{noticeDetail.content}</p>
        </div>
      )}
    </div>
  );
}
