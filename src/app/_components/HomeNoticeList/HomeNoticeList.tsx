"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "../../page.module.scss";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import { formatDate } from "@/_utils/formatDate";

export default function HomeNoticeList() {
  const { dataList: notices, fetchDataList } = useAPIData<
    typeof API_URLS.notices.method.get
  >(API_URLS.notices);

  useEffect(() => {
    fetchDataList(1, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
