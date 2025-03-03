"use client";
import React, { useEffect } from "react";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import BoardListLayout from "@/_layout/support/list/layout";
import { useAuth } from "@/_hooks/useAuth";
import useBoardAction from "@/_hooks/useBoardAction";
import usePagination from "@/_hooks/usePagination";

export default function Notice() {
  // TODO: 페이징 기능 추가하기
  const boardType = "notice";
  const { isLoggedIn } = useAuth();

  const {
    dataList: notices,
    paginationInfo,
    fetchDataList,
  } = useAPIData<typeof API_URLS.notices.method.get>(API_URLS.notices);

  const { goToEditPage } = useBoardAction("support", boardType);

  const noticeTableHeadList = ["No", "제목", "글쓴이", "등록일", "조회"];
  const colWidthList = [100, 400, 100, 100, 100];
  const lastPageNumber = paginationInfo?.lastPage || 1;

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
      boardType={boardType}
      tableHeadList={noticeTableHeadList}
      list={notices}
      handleEditClick={goToEditPage}
      colWidthList={colWidthList}
      pages={pages}
      handleArrowClick={clickArrowButton}
      handlePageClick={clickPageButton}
      currentPage={currentPage}
    />
  );
}
