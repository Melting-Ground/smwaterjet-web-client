"use client";
import React, { useEffect, useState } from "react";
import { API_URLS } from "@/_config/apiConfig";
import BoardListLayout from "@/_layout/support/list/layout";
import { useAuth } from "@/_hooks/useAuth";
import useBoardAction from "@/_hooks/useBoardAction";
import usePagination from "@/_hooks/usePagination";
import useSWR from "swr";
import axiosInstance from "@/_config/axiosInstance";
import { PaginationInfoType } from "@/_types/pagination";

export default function Notice() {
  // TODO: 페이징 기능 추가하기
  const boardType = "notice";
  const { isLoggedIn } = useAuth();

  const { goToEditPage } = useBoardAction("support", boardType);

  const noticeTableHeadList = ["No", "제목", "글쓴이", "등록일"];
  const colWidthList = [80, 420, 120, 120];
  const [lastPageNumber, setLastPageNumber] = useState(1);

  const {
    currentPage,
    pages,
    clickArrowButton,
    clickPageButton,
  } = usePagination(lastPageNumber);

  type NoticeItem = typeof API_URLS.notices.method.get;
  const limit = 10;
  const { data } = useSWR<{ items: NoticeItem[]; pagination: PaginationInfoType }>(
    ["notices", currentPage, limit],
    () =>
      axiosInstance
        .get(`${API_URLS.notices.url}?page=${currentPage}&limit=${limit}`)
        .then((res) => res.data),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const notices = data?.items ?? [];
  const paginationInfo = data?.pagination;

  useEffect(() => {
    if (paginationInfo?.lastPage) {
      setLastPageNumber(paginationInfo.lastPage);
    }
  }, [paginationInfo?.lastPage]);

  return (
    <BoardListLayout
      isLoggedIn={isLoggedIn}
      boardType={boardType}
      tableHeadList={noticeTableHeadList}
      list={notices}
      handleEditClick={goToEditPage}
      colWidthList={colWidthList}
      pageSize={paginationInfo?.limit || 10}
      pages={pages}
      handleArrowClick={clickArrowButton}
      handlePageClick={clickPageButton}
      currentPage={currentPage}
    />
  );
}
