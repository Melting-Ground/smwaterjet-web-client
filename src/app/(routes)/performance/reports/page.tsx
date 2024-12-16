"use client";
import React, { useEffect } from "react";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import useFormData from "@/_hooks/useFormData";
import BoardListLayout from "@/_layout/reports/list/layout";
import useBoardAction from "@/_hooks/useBoardAction";
import { useAuth } from "@/_hooks/useAuth";
import usePagination from "@/_hooks/usePagination";
// 게시판
// TODO: 페이지네이션
export default function Reports() {
  const REPORTS_API = API_URLS.reports;
  const {
    dataList: reports,
    paginationInfo,
    fetchDataList,
  } = useAPIData<typeof REPORTS_API.method.get>(REPORTS_API);
  const { isLoggedIn } = useAuth();

  const lastPageNumber = paginationInfo?.lastPage || 1;

  console.log(reports);
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

  const {
    currentPage,
    pages,
    clickArrowButton,
    clickPageButton,
    setCurrentPage,
  } = usePagination(lastPageNumber);

  useEffect(() => {
    fetchDataList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <BoardListLayout
      isLoggedIn={isLoggedIn}
      handleDelete={deleteItem}
      handleEditClick={goToEditPage}
      tableHeadList={reportsTableHeadList}
      list={reports}
      colWidthList={colWidthList}
      pages={pages}
      handleArrowClick={clickArrowButton}
      handlePageClick={clickPageButton}
      currentPage={currentPage}
    />
  );
}
