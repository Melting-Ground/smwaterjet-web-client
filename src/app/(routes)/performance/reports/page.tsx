"use client";
import React from "react";
import BoardListLayout from "../../support/_layout/list/layout";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";

export default function Reports() {
  // 게시판
  const { dataList: notices } = useAPIData<typeof API_URLS.notices.method.get>(
    API_URLS.notices,
    1
  );
  const noticeTableHeadList = [
    "No",
    "공사명",
    "공사년도",
    "시작일",
    "종료일",
    "비고",
  ];
  return (
    <BoardListLayout
      type="reports"
      tableHeadList={noticeTableHeadList}
      list={notices}
      colWidthList={[80, 300, 90, 80, 80, 50]}
    />
  );
}
