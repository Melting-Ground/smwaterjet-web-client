"use client";
import React from "react";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import BoardListLayout from "@/_layout/support/list/layout";
import useBoardAction from "@/_hooks/useBoardAction";
import { useAuth } from "@/_hooks/useAuth";
import usePagination from "@/_hooks/usePagination";

export default function Inquiry() {
  const boardType = "inquiry";
  const { isLoggedIn } = useAuth();

  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get("page");

  const { dataList: inquiries, paginationInfo } = useAPIData<
    typeof API_URLS.inquiries.method.get
  >(API_URLS.inquiries, pageParam ? Number(pageParam) : 1);

  const lastPageNumber = paginationInfo?.lastPage || 1;

  const { currentPage, pages, clickArrowButton, clickPageButton } =
    usePagination(lastPageNumber);

  const { goToEditPage } = useBoardAction("support", boardType);

  const inquiryTableHeadList = ["No", "제목", "글쓴이", "등록일"];
  const colWidthList = [80, 400, 100, 100];

  return (
    <BoardListLayout
      isLoggedIn={isLoggedIn}
      tableHeadList={inquiryTableHeadList}
      list={inquiries}
      boardType={boardType}
      colWidthList={colWidthList}
      handleEditClick={goToEditPage}
      pages={pages}
      handleArrowClick={clickArrowButton}
      handlePageClick={clickPageButton}
      currentPage={currentPage}
    />
  );
}
