"use client";
import React, { useState } from "react";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import BoardEditLayout from "../../_layout/edit/layout";

export default function Edit() {
  const NOTICE_API = API_URLS.notices;

  const [noticeContents, setNoticeContents] = useState<
    typeof NOTICE_API.method.post
  >({
    title: "",
    content: "",
    author: "관리자",
    files: [null, null, null, null, null],
  });

  const { handleChange, handleSubmit } = useFormData<
    typeof NOTICE_API.method.get,
    typeof NOTICE_API.method.post
  >(NOTICE_API, noticeContents, setNoticeContents);

  // TODO: * 표시 하기 (필수항목)
  return (
    <BoardEditLayout
      type="notice"
      contents={noticeContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
