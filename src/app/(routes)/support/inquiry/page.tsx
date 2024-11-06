"use client";
import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { formatDate } from "../../../_utils/formatDate";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";

export default function Inquiry() {
  const { dataList: inquiries } = useAPIData<
    typeof API_URLS.inquiries.method.get
  >(API_URLS.inquiries);

  return (
    <div className={styles.container}>
      <Link href={"/support/inquiry/edit"}>글쓰기</Link>
      <table className={styles.table} width={920}>
        <colgroup>
          <col width={130} />
          <col width={535} />
          <col width={115} />
          <col width={115} />
          <col width={140} />
          {/* 1035 */}
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">제목</th>
            <th scope="col">첨부 파일</th>
            <th scope="col">글쓴이</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((noticeItem) => (
            <tr key={noticeItem.id}>
              <td>{noticeItem.id}</td>
              <td className={styles.title}>
                <Link href={`/support/notice/${noticeItem.id}`}>
                  {noticeItem.title}
                </Link>
              </td>
              <td>{noticeItem.files.length}</td>
              <td>이땡땡</td>
              <td>
                <time dateTime={noticeItem.created_at}>
                  {formatDate(noticeItem.created_at)}
                </time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
