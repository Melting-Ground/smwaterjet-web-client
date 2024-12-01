"use client";
import React from "react";
import BoardListLayout from "../../support/_layout/list/layout";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";

export default function Reports() {
  // 게시판
  // TODO: 페이지네이션
  const { dataList: reports } = useAPIData<typeof API_URLS.reports.method.get>(
    API_URLS.reports,
    1
  );
  const reportsTableHeadList = [
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
      tableHeadList={reportsTableHeadList}
      list={reports}
      colWidthList={[80, 300, 90, 80, 80, 50]}
    />
  );
}
