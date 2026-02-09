"use client";
import { useParams } from "next/navigation"; // useParams를 import합니다
import React from "react";
import { API_URLS } from "@/_config/apiConfig";
import BoardDetailLayout from "@/_layout/support/[id]/layout";
import { useAuth } from "@/_hooks/useAuth";
import useFormData from "@/_hooks/useFormData";
import useBoardAction from "@/_hooks/useBoardAction";
import useSWR from "swr";
import axiosInstance from "@/_config/axiosInstance";
import { PaginationInfoType } from "@/_types/pagination";

export default function NoticeDetail() {
  // TODO: 조회수 추가하기
  const boardType = "notice";
  type NoticeItem = typeof API_URLS.notices.method.get;

  const { id } = useParams();
  const { isLoggedIn } = useAuth();

  const currentId = typeof id === "string" ? id : undefined;

  const { data: noticeDetail, isValidating } = useSWR<NoticeItem>(
    currentId ? ["notice-detail", currentId] : null,
    () =>
      axiosInstance
        .get(`${API_URLS.notices.url}/${currentId}`)
        .then((res) => res.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const { data: noticeListData } = useSWR<{
    items: NoticeItem[];
    pagination: PaginationInfoType;
  }>(
    ["notice-list", 1, 100],
    () =>
      axiosInstance
        .get(`${API_URLS.notices.url}?page=1&limit=100`)
        .then((res) => res.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      keepPreviousData: true,
    }
  );

  const noticeList = noticeListData?.items ?? [];

  const { deleteItem } = useFormData(API_URLS.notices);
  const { goToEditPage, goToListPage } = useBoardAction("support", "notice");
  const handleEditClick = () => {
    goToEditPage(currentId);
  };
  const handleDelete = async (id: string) => {
    const isDeleted = await deleteItem(id);
    if (isDeleted) {
      goToListPage();
    }
  };

  const isNotLoaded = isValidating || !noticeDetail;
  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }
  return !isNotLoaded ? (
    <BoardDetailLayout
      dataDetail={noticeDetail}
      dataList={noticeList}
      currentId={Number(currentId)}
      boardType={boardType}
      hasPermission={isLoggedIn}
      handleDelete={handleDelete}
      handleEditClick={handleEditClick}
      handleListClick={goToListPage}
    />
  ) : (
    <div>로딩중...</div>
  );
}
