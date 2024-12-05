"use client";
import React from "react";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import useFormData from "@/_hooks/useFormData";
import BoardListLayout from "@/_layout/reports/list/layout";
import useBoardAction from "@/_hooks/useBoardAction";
import { useAuth } from "@/_hooks/useAuth";
// 게시판
// TODO: 페이지네이션
export default function Reports() {
  const REPORTS_API = API_URLS.reports;
  const { dataList: reports } = useAPIData<typeof API_URLS.reports.method.get>(
    REPORTS_API,
    1
  );
  const { isLoggedIn } = useAuth();
  const { deleteItem } = useFormData(REPORTS_API);
  const { goToEditPage } = useBoardAction("performance", "reports");
  const reportsTableHeadList = [
    "No",
    "공사년도",
    "공사명",
    "시작일",
    "종료일",
    "비고",
  ];
  const colWidthList = [50, 50, 250, 80, 80, 50];

  return (
    <BoardListLayout
      isLoggedIn={isLoggedIn}
      handleDelete={deleteItem}
      handleEditClick={goToEditPage}
      tableHeadList={reportsTableHeadList}
      list={reports}
      colWidthList={colWidthList}
    />
  );
}
