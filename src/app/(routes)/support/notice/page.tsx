"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import axiosInstance from "../../../_config/axiosInstance";
import { useNoticeContext } from "../../../_contexts/noticeContext";
import useNotices from "../../../_hooks/useNotices";

export default function Notice() {
  const { notices, setNotices } = useNotices();

  return (
    <div className={styles.container}>
      <Link href={"/support/notice/edit"}>글쓰기</Link>
      <table className={styles.table} width={920}>
        <colgroup>
          <col width={130} />
          <col width={535} />
          <col width={115} />
          <col width={140} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">제목</th>
            <th scope="col">첨부 파일</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((noticeItem) => (
            <tr key={noticeItem.id}>
              <td>{noticeItem.id}</td>
              <td className={styles.title}>
                <Link href={`/support/notice/${noticeItem.id}`}>
                  {noticeItem.title}
                </Link>
              </td>
              <td>{noticeItem.files.length}</td>
              <td>
                <time dateTime={noticeItem.created_at}>
                  {noticeItem.created_at.substring(0, 10)}
                </time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
