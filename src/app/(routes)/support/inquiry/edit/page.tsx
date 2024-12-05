"use client";
import React, { useState } from "react";
import useFormData from "@/_hooks/useFormData";
import { API_URLS } from "@/_config/apiConfig";
import BoardEditLayout from "@/_layout/support/edit/layout";
import useBoardAction from "@/_hooks/useBoardAction";

// TODO: 시멘틱 태그로 바꾸기
// id, username, phone_number, password, email, title, content
export default function Edit() {
  const INQUIRY_API = API_URLS.inquiries;

  const [inquiryContents, setInquiryContents] = useState<
    typeof INQUIRY_API.method.post
  >({
    author: "",
    phone_number: "",
    email: "",
    title: "",
    content: "",
    password: "",
    files: [null, null, null, null, null],
  });

  const { handleChange, uploadForm } = useFormData<
    typeof INQUIRY_API.method.get,
    typeof INQUIRY_API.method.post
  >(INQUIRY_API, inquiryContents, setInquiryContents);

  const { goToListPage } = useBoardAction("support", "inquiry");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await uploadForm(e);
      // TODO: 게시물 등록 후 생성된 id에 해당하는 페이지로 이동
      // goToDetailPage(id);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <BoardEditLayout
      type="inquiry"
      method="upload"
      contents={inquiryContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListClick={goToListPage}
    />
  );
}
