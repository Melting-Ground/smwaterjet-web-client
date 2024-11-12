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
  } = useAPIData<typeof API_URLS.inquiries.method.get>(API_URLS.inquiries);

  const { id } = useParams();
  const { password } = UserInquiryPasswordContext();
  const router = useRouter();

  const getInquiryDetail = async (id: string) => {
    const errorMessage = await fetchInquiryDetail(id, password);
    if (errorMessage) {
      alert(errorMessage);
      router.push(`/support/inquiry/${id}/password`);
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      getInquiryDetail(id);
    }
  }, [id]);

  return (
    <BoardDetailLayout
      dataList={inquiryList}
      dataDetail={inquiryDetail}
      type="inquiry"
      currentId={Number(id)}
    />
  );
}
