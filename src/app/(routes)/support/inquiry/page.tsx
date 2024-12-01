"use client";
import React from "react";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";
import BoardListLayout from "../_layout/list/layout";

export default function Inquiry() {
  const { dataList: inquiries } = useAPIData<
    typeof API_URLS.inquiries.method.get
  >(API_URLS.inquiries, 1);

  const inquiryTableHeadList = ["No", "제목", "글쓴이", "등록일"];

  return (
    <BoardListLayout
      tableHeadList={inquiryTableHeadList}
      list={inquiries}
      type="inquiry"
      colWidthList={[80, 500, 100, 100]}
    />
  );
}
