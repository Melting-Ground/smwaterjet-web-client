"use client";
import { useParams } from "next/navigation"; // useParams瑜?import?⑸땲??
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
      // 鍮꾨?踰덊샇 ?낅젰 ?섏씠吏濡??쇱슦??(return)
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
    return <div>議댁옱?섏? ?딅뒗 寃뚯떆臾쇱엯?덈떎.</div>;
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
