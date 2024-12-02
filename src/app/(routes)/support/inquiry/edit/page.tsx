"use client";
import React, { useState } from "react";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import BoardEditLayout from "../../_layout/edit/layout";

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

  const { handleChange, handleUpload, isFormDirty } = useFormData<
    typeof INQUIRY_API.method.get,
    typeof INQUIRY_API.method.post
  >(INQUIRY_API, inquiryContents, setInquiryContents);

  return (
    <BoardEditLayout
      type="inquiry"
      contents={inquiryContents}
      handleChange={handleChange}
      handleSubmit={handleUpload}
      isFormDirty={isFormDirty}
    />
  );
}
