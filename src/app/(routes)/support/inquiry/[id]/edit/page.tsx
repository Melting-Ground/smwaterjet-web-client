"use client";
import React, { useEffect } from "react";
import BoardEditLayout from "../../../_layout/edit/layout";
import { API_URLS } from "../../../../../_config/apiConfig";
import { useState } from "react";
import useFormData from "../../../../../_hooks/useFormData";
import { useParams, useRouter } from "next/navigation";
import { useAPIData } from "../../../../../_hooks/useAPIData";
import { UserInquiryPasswordContext } from "../../../../../_contexts/inquiryContext";

// 수정 페이지
// TODO: 관리자 외 접근 제한 처리
export default function Edit() {
  const INQUIRY_API = API_URLS.inquiries;
  const router = useRouter();
  const { id } = useParams();
  const { password } = UserInquiryPasswordContext();

  let currentId;
  if (typeof id === "string") {
    currentId = id;
  }
  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  const {
    fetchData: fetchInquiryDetail,
    dataDetail: inquiryDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.inquiries.method.get>(API_URLS.inquiries);

  // 로딩 상태 확인 후, 데이터가 로드되면 상태를 업데이트
  const [inquiryContents, setInquiryContents] = useState<
    typeof INQUIRY_API.method.put
  >({
    author: "",
    phone_number: "",
    email: "",
    title: "",
    content: "",
    password: "",
    files: [],
  });

  useEffect(() => {
    if (password) {
      fetchInquiryDetail(currentId, password);
    }
  }, [currentId]);

  useEffect(() => {
    if (inquiryDetail) {
      console.log("inquiryDetail", inquiryDetail);
      setInquiryContents({
        author: inquiryDetail?.author || "",
        phone_number: inquiryDetail?.phone_number || "",
        password: password || "",
        email: inquiryDetail?.email || "",
        title: inquiryDetail?.title || "",
        content: inquiryDetail?.content || "",
        // TODO: 파일 처리
        files: [],
      });
    }
  }, [inquiryDetail]);

  const { handleChange, handleUpdate, isFormDirty } = useFormData<
    typeof INQUIRY_API.method.get,
    typeof INQUIRY_API.method.put
  >(INQUIRY_API, inquiryContents, setInquiryContents);

  if (isLoading.detail) {
    return <div>상세 데이터 로딩중</div>;
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await handleUpdate(e, currentId);
      router.push(`/support/inquiry/${currentId}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <BoardEditLayout
      type="inquiry"
      method="update"
      contents={inquiryContents}
      handleChange={handleChange}
      handleSubmit={handleFormSubmit}
      isFormDirty={isFormDirty}
    />
  );
}
