"use client";
import React from "react";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";
import BoardListLayout from "./_layout/list/layout";

export default function Reports() {
  // 게시판
  // TODO: 페이지네이션
  const { dataList: reports } = useAPIData<typeof API_URLS.reports.method.get>(
    API_URLS.reports,
    1
  );
  const reportsTableHeadList = [
    "No",
    "공사년도",
    "공사명",
    "시작일",
    "종료일",
    "비고",
  ];
  return (
    <BoardListLayout
      tableHeadList={reportsTableHeadList}
      list={reports}
      colWidthList={[50, 50, 250, 80, 80, 40]}
    />
  );
}
