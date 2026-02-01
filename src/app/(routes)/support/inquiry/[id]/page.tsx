"use client";
import { useParams } from "next/navigation"; // useParams를 import합니다
import React, { useEffect } from "react";
import { API_URLS } from "@/_config/apiConfig";
import { useAPIData } from "@/_hooks/useAPIData";
import { UserInquiryPasswordContext } from "@/_contexts/inquiryContext";
import { useRouter } from "next/navigation";
import BoardDetailLayout from "@/_layout/support/[id]/layout";
import useFormData from "@/_hooks/useFormData";
import useBoardAction from "@/_hooks/useBoardAction";
import { useAuth } from "@/_hooks/useAuth";

export default function InquiryDetail() {
  const router = useRouter();
  const boardType = "inquiry";
  const {
    fetchData: fetchInquiryDetail,
    fetchDataList,
    dataList: inquiryList,
    dataDetail: inquiryDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.inquiries.method.get>(API_URLS.inquiries);

  const { id } = useParams();
  const { password } = UserInquiryPasswordContext();
  const { isLoggedIn } = useAuth();

  const currentId = typeof id === "string" ? id : undefined;

  const { deleteItem } = useFormData(API_URLS.inquiries);
  const { goToEditPage, goToListPage } = useBoardAction("support", "inquiry");

  const handleEditClick = () => {
    goToEditPage(currentId);
  };

  const getInquiryDetail = async (id: string) => {
    const errorMessage = await fetchInquiryDetail(
      id,
      isLoggedIn ? undefined : password
    );
    if (errorMessage) {
      alert(errorMessage);
      // 비밀번호 입력 페이지로 이동 (return)
      if (!isLoggedIn) {
        router.push(`/support/inquiry/${id}/password`);
      }
    }
  };

  useEffect(() => {
    if (currentId) {
      getInquiryDetail(currentId);
    }
  }, [currentId]);

  useEffect(() => {
    fetchDataList(1, 100);
  }, []);

  const handleDelete = async (id: string) => {
    const isDeleted = await deleteItem(id);
    if (isDeleted) {
      router.push("/support/inquiry");
    }
  };
  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }
  const isNotLoaded = isLoading.detail || !inquiryDetail;

  return !isNotLoaded ? (
    <BoardDetailLayout
      dataList={inquiryList}
      dataDetail={inquiryDetail}
      boardType={boardType}
      hasPermission
      currentId={Number(currentId)}
      handleDelete={handleDelete}
      handleEditClick={handleEditClick}
      handleListClick={goToListPage}
    />
  ) : (
    <div>로딩중...</div>
  );
}
