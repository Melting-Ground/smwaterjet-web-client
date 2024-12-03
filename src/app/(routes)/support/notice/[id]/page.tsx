"use client";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect } from "react";
import { API_URLS } from "@/_config/apiConfig";
import { useAPIData } from "@/_hooks/useAPIData";
import BoardDetailLayout from "@/_layout/support/[id]/layout";

export default function NoticeDetail() {
  // TODO: 조회수 추가하기
  const {
    fetchData: fetchNoticeDetail,
    dataList: noticeList,
    dataDetail: noticeDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.notices.method.get>(API_URLS.notices);

  const { id } = useParams();

  let currentId;
  if (typeof id === "string") {
    currentId = id;
  }
  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  useEffect(() => {
    fetchNoticeDetail(currentId);
  }, [currentId]);

  const isNotLoaded = isLoading.detail || !noticeDetail;

  return !isNotLoaded ? (
    <BoardDetailLayout
      dataDetail={noticeDetail}
      dataList={noticeList}
      currentId={Number(currentId)}
      type="notice"
    />
  ) : (
    <div>로딩중</div>
  );
}
