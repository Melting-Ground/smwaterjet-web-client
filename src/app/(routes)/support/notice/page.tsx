"use client";
import React from "react";
import { useAPIData } from "@/_hooks/useAPIData";
import { API_URLS } from "@/_config/apiConfig";
import BoardListLayout from "@/_layout/support/list/layout";
import { useAuth } from "@/_hooks/useAuth";
import useBoardAction from "@/_hooks/useBoardAction";

export default function Notice() {
  // TODO: 페이징 기능 추가하기
  const boardType = "notice";
  const { isLoggedIn } = useAuth();

  const { dataList: notices, paginationInfo } = useAPIData<
    typeof API_URLS.notices.method.get
  >(API_URLS.notices, 1);
  const { goToEditPage } = useBoardAction("support", boardType);

  const noticeTableHeadList = ["No", "제목", "글쓴이", "등록일", "조회"];
  const colWidthList = [100, 450, 100, 100, 100];
  const lastPageNumber = paginationInfo?.lastPage || 0;
  return (
    <BoardListLayout
      isLoggedIn={isLoggedIn}
      boardType={boardType}
      tableHeadList={noticeTableHeadList}
      list={notices}
      handleEditClick={goToEditPage}
      colWidthList={colWidthList}
      lastPageNumber={lastPageNumber}
    />
  );
}
