"use client";
import React from "react";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";
import BoardListLayout from "../_layout/list/layout";

export default function Notice() {
  // TODO: 페이징 기능 추가하기
  // TODO: 폰트 키워도 될 것 같음
  const { dataList: notices } = useAPIData<typeof API_URLS.notices.method.get>(
    API_URLS.notices,
    1
  );
  const noticeTableHeadList = ["No", "제목", "글쓴이", "등록일", "조회"];
  return (
    <BoardListLayout
      type="notice"
      tableHeadList={noticeTableHeadList}
      list={notices}
      colWidthList={[100, 450, 100, 100, 100]}
    />
  );
}
