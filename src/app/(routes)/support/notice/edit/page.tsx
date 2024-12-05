"use client";
import React, { useState } from "react";
import useFormData from "@/_hooks/useFormData";
import { API_URLS } from "@/_config/apiConfig";
import BoardEditLayout from "@/_layout/support/edit/layout";
import useBoardAction from "@/_hooks/useBoardAction";

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

  const { handleChange, uploadForm } = useFormData<
    typeof NOTICE_API.method.get,
    typeof NOTICE_API.method.post
  >(NOTICE_API, noticeContents, setNoticeContents);

  const { goToListPage } = useBoardAction("support", "notice");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await uploadForm(e);
      // TODO: 게시물 등록 후 생성된 id에 해당하는 페이지로 이동
      // goToDetailPage(id);
    } catch (error) {
      alert(error);
    }
  };

  // TODO: * 표시 하기 (필수항목)
  return (
    <BoardEditLayout
      type="notice"
      method="upload"
      contents={noticeContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListClick={goToListPage}
    />
  );
}
