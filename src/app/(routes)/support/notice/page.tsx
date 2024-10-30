"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import axiosInstance from "../../../_config/axiosInstance";
import { useRouter } from "next/navigation";

export default function Notice() {
  const router = useRouter();
  const defaultData = [
    {
      id: 1,
      title: "첫 번째 제목",
      content: "slkfjalsdjfskjdlfs",
      date: "2024-10-01",
    },
    {
      id: 2,
      title: "두 번째 제목",
      content: "slkfjalsdjfskjdlfs",
      date: "2024-10-02",
    },
    {
      id: 3,
      title: "세 번째 제목",
      content: "slkfjalsdjfskjdlfs",
      date: "2024-10-03",
    },
  ];

  const [data, setData] = useState(defaultData);

  const fetchNoticeList = async () => {
    try {
      const response = await axiosInstance.get("/support/notices");
      console.log("notices", response.data);
      setData(response.data);
    } catch (error) {
      console.error("에러", error);
    }
  };

  useEffect(() => {
    fetchNoticeList();
  }, []);

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
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => {
                router.push(`/support/notice/${item.id}`);
              }}
            >
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
