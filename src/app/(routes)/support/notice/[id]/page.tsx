"use client";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect } from "react";
import { API_URLS } from "../../../../_config/apiConfig";
import { useAPIData } from "../../../../_hooks/useAPIData";
import BoardDetailLayout from "../../_layout/[id]/layout";

export default function NoticeDetail() {
  // TODO: 조회수 추가하기
  const {
    fetchData: fetchNoticeDetail,
    dataList: noticeList,
    dataDetail: noticeDetail,
  } = useAPIData<typeof API_URLS.notices.method.get>(API_URLS.notices);

  const { id } = useParams();
  useEffect(() => {
    if (typeof id === "string") {
      fetchNoticeDetail(id);
    }
  }, [id]);

  return (
    <BoardDetailLayout
      dataDetail={noticeDetail}
      dataList={noticeList}
      currentId={Number(id)}
      type="notice"
    />
  );
}
