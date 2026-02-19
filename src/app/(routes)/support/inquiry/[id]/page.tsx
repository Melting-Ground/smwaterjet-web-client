"use client";
import { useParams } from "next/navigation"; // useParams를 import합니다
import React, { useEffect } from "react";
import { API_URLS } from "@/_config/apiConfig";
import { UserInquiryPasswordContext } from "@/_contexts/inquiryContext";
import { useRouter } from "next/navigation";
import BoardDetailLayout from "@/_layout/support/[id]/layout";
import useFormData from "@/_hooks/useFormData";
import useBoardAction from "@/_hooks/useBoardAction";
import { useAuth } from "@/_hooks/useAuth";
import useSWR from "swr";
import axiosInstance from "@/_config/axiosInstance";
import { PaginationInfoType } from "@/_types/pagination";
import { AxiosError } from "axios";
import { getAuthHeaders } from "@/_utils/getAuth";

export default function InquiryDetail() {
  const router = useRouter();
  const boardType = "inquiry";
  type InquiryItem = typeof API_URLS.inquiries.method.get;

  const { id } = useParams();
  const { password } = UserInquiryPasswordContext();
  const { isLoggedIn } = useAuth();

  const currentId = typeof id === "string" ? id : undefined;

  const { deleteItem } = useFormData(API_URLS.inquiries);
  const { goToEditPage, goToListPage } = useBoardAction("support", "inquiry");

  const handleEditClick = () => {
    goToEditPage(currentId);
  };

  const { data: inquiryDetailData, isValidating } = useSWR<{
    data: InquiryItem | null;
    errorMessage: string | null;
  }>(
    currentId
      ? ["inquiry-detail", currentId, isLoggedIn ? "auth" : password ?? ""]
      : null,
    async () => {
      try {
        const res = await axiosInstance.get(
          `${API_URLS.inquiries.url}/${currentId}`,
          getAuthHeaders(isLoggedIn ? undefined : password)
        );
        return { data: res.data, errorMessage: null };
      } catch (error) {
        const status = (error as AxiosError).response?.status;
        const errorMessage =
          status === 401 ? "Invalid password." : "Failed to load.";
        return { data: null, errorMessage };
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const { data: inquiryListData } = useSWR<{
    items: InquiryItem[];
    pagination: PaginationInfoType;
  }>(
    ["inquiry-list", 1, 100],
    () =>
      axiosInstance
        .get(`${API_URLS.inquiries.url}?page=1&limit=100`)
        .then((res) => res.data),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      keepPreviousData: true,
    }
  );

  const inquiryDetail = inquiryDetailData?.data ?? null;
  const inquiryList = inquiryListData?.items ?? [];

  useEffect(() => {
    if (!currentId || !inquiryDetailData?.errorMessage) return;
    alert(inquiryDetailData.errorMessage);
    if (!isLoggedIn) {
      router.push(`/support/inquiry/${currentId}/password`);
    }
  }, [currentId, inquiryDetailData?.errorMessage, isLoggedIn, router]);

  const handleDelete = async (id: string) => {
    const isDeleted = await deleteItem(id);
    if (isDeleted) {
      router.push("/support/inquiry");
    }
  };
  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }
  const isNotLoaded = isValidating || !inquiryDetail;

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
