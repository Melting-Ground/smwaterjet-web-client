"use client";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect } from "react";
import { API_URLS } from "../../../../_config/apiConfig";
import { useAPIData } from "../../../../_hooks/useAPIData";
import { UserInquiryPasswordContext } from "../../../../_contexts/inquiryContext";
import { useRouter } from "next/navigation";
import BoardDetailLayout from "../../_layout/[id]/layout";
// TODO: 파일 경로 @

export default function InquiryDetail() {
  const {
    fetchData: fetchInquiryDetail,
    dataList: inquiryList,
    dataDetail: inquiryDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.inquiries.method.get>(API_URLS.inquiries);

  const { id } = useParams();
  const { password } = UserInquiryPasswordContext();
  const router = useRouter();

  let currentId;
  if (typeof id === "string") {
    currentId = id;
  }
  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  const getInquiryDetail = async (id: string) => {
    const errorMessage = await fetchInquiryDetail(id, password);
    if (errorMessage) {
      alert(errorMessage);
      router.push(`/support/inquiry/${id}/password`);
    }
  };

  useEffect(() => {
    getInquiryDetail(currentId);
  }, [currentId]);
  
  const isNotLoaded = isLoading.detail || !inquiryDetail;

  return !isNotLoaded ? (
    <BoardDetailLayout
      dataList={inquiryList}
      dataDetail={inquiryDetail}
      type="inquiry"
      currentId={Number(currentId)}
    />
  ) : (
    <div>로딩중</div>
  );
}
