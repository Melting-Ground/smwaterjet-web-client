"use client";
import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { formatDate } from "../../../_utils/formatDate";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";
import BoardListLayout from "../_layout/list/layout";

export default function Notice() {
  const { dataList: notices } = useAPIData<typeof API_URLS.notices.method.get>(
    API_URLS.notices,
    1
  );
  const noticeTableHeadList = ["No", "제목", "글쓴이", "등록일", "조회"];
  return (
    <BoardListLayout
      type="notice"
      tableHeadList={noticeTableHeadList}
      list={notices}
    />
  );
}
