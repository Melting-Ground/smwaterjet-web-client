"use client";

import Link from "next/link";
import styles from "../../page.module.scss";
import { API_URLS } from "@/_config/apiConfig";
import { formatDate } from "@/_utils/formatDate";
import useSWR from "swr";
import axiosInstance from "@/_config/axiosInstance";
import { PaginationInfoType } from "@/_types/pagination";
import AsyncState from "../AsyncState/AsyncState";

export default function HomeNoticeList() {
  type NoticeItem = typeof API_URLS.notices.method.get;
  const { data, error, isLoading, mutate } = useSWR<{
    items: NoticeItem[];
    pagination: PaginationInfoType;
  }>(["home-notices", 1, 4], () =>
    axiosInstance
      .get(`${API_URLS.notices.url}?page=1&limit=4`)
      .then((response) => response.data)
  );
  const notices = data?.items ?? [];

  if (isLoading) {
    return <AsyncState status="loading" message="공지사항을 불러오는 중입니다." compact />;
  }

  if (error) {
    return (
      <AsyncState
        status="error"
        message="공지사항을 불러오지 못했습니다."
        onRetry={() => mutate()}
        compact
      />
    );
  }

  if (notices.length === 0) {
    return <AsyncState status="empty" message="등록된 공지사항이 없습니다." compact />;
  }

  return (
    <ol className={styles["notice-list"]}>
      {notices.map((notice) => (
        <li key={notice.id} className={styles["notice-item"]}>
          <Link href={`/support/notice/${notice.id}`}>
            <div className={styles["notice-item-left"]}>
              <p className={styles["notice-item-title"]}>{notice.title}</p>
            </div>
            <p className={styles["notice-item-date"]}>
              {formatDate(notice.created_at)}
            </p>
          </Link>
        </li>
      ))}
    </ol>
  );
}
