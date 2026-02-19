"use client";
import React, { useEffect, useState } from "react";
import { API_URLS } from "@/_config/apiConfig";
import BoardListLayout from "@/_layout/support/list/layout";
import useBoardAction from "@/_hooks/useBoardAction";
import { useAuth } from "@/_hooks/useAuth";
import usePagination from "@/_hooks/usePagination";
import useSWR from "swr";
import axiosInstance from "@/_config/axiosInstance";
import { PaginationInfoType } from "@/_types/pagination";

export default function Inquiry() {
  const boardType = "inquiry";
  const { isLoggedIn } = useAuth();

  const [lastPageNumber, setLastPageNumber] = useState(1);

  const {
    currentPage,
    pages,
    clickArrowButton,
    clickPageButton,
  } = usePagination(lastPageNumber);

  type InquiryItem = typeof API_URLS.inquiries.method.get;
  const limit = 10;
  const { data } = useSWR<
    { items: InquiryItem[]; pagination: PaginationInfoType }
  >(
    ["inquiries", currentPage, limit],
    () =>
      axiosInstance
        .get(`${API_URLS.inquiries.url}?page=${currentPage}&limit=${limit}`)
        .then((res) => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const inquiries = data?.items ?? [];
  const paginationInfo = data?.pagination;

  useEffect(() => {
    if (paginationInfo?.lastPage) {
      setLastPageNumber(paginationInfo.lastPage);
    }
  }, [paginationInfo?.lastPage]);

  const { goToEditPage } = useBoardAction("support", boardType);

  const inquiryTableHeadList = ["No", "제목", "글쓴이", "등록일"];
  const colWidthList = [80, 420, 120, 120];

  return (
    <BoardListLayout
      isLoggedIn={isLoggedIn}
      tableHeadList={inquiryTableHeadList}
      list={inquiries}
      boardType={boardType}
      colWidthList={colWidthList}
      handleEditClick={goToEditPage}
      pageSize={paginationInfo?.limit || 10}
      pages={pages}
      handleArrowClick={clickArrowButton}
      handlePageClick={clickPageButton}
      currentPage={currentPage}
    />
  );
}


