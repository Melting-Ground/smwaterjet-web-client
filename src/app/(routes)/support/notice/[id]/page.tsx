"use client";
import { useParams, useRouter } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect } from "react";
import { API_URLS } from "@/_config/apiConfig";
import { useAPIData } from "@/_hooks/useAPIData";
import BoardDetailLayout from "@/_layout/support/[id]/layout";
import { useAuth } from "@/_hooks/useAuth";
import useFormData from "@/_hooks/useFormData";
import useBoardAction from "@/_hooks/useBoardAction";

export default function NoticeDetail() {
  // TODO: 조회수 추가하기
  const router = useRouter();
  const boardType = "notice";
  const {
    fetchData: fetchNoticeDetail,
    dataList: noticeList,
    dataDetail: noticeDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.notices.method.get>(API_URLS.notices);

  const { id } = useParams();
  const { isLoggedIn } = useAuth();

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

  const { deleteItem } = useFormData(API_URLS.notices);
  const { goToEditPage, goToListPage } = useBoardAction(
    "support",
    "notice",
    
  );
  const handleEditClick = () => {
    goToEditPage(currentId);
  }

  const isNotLoaded = isLoading.detail || !noticeDetail;

  return !isNotLoaded ? (
    <BoardDetailLayout
      dataDetail={noticeDetail}
      dataList={noticeList}
      currentId={Number(currentId)}
      boardType={boardType}
      isLoggedIn={isLoggedIn}
      handleDelete={deleteItem}
      handleEditClick={handleEditClick}
      handleListClick={goToListPage}
    />
  ) : (
    <div>로딩중</div>
  );
}
