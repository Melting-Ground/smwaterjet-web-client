"use client";
import React, { useEffect } from "react";
import BoardEditLayout from "@/_layout/support/edit/layout";
import { API_URLS } from "@/_config/apiConfig";
import { useState } from "react";
import useFormData from "@/_hooks/useFormData";
import { useParams } from "next/navigation";
import { useAPIData } from "@/_hooks/useAPIData";
import useBoardAction from "@/_hooks/useBoardAction";
import useBoardFiles from "@/_hooks/useBoardFiles";

// 수정 페이지
// TODO: 관리자 외 접근 제한 처리
export default function Edit() {
  const NOTICE_API = API_URLS.notices;
  const { id } = useParams();

  const currentId = typeof id === "string" ? id : undefined;

  const {
    fetchData: fetchNoticeDetail,
    dataDetail: noticeDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.notices.method.get>(API_URLS.notices);

  const [noticeContents, setNoticeContents] = useState<
    typeof NOTICE_API.method.put
  >({
    title: "",
    content: "",
    author: "",
    files: [],
  });

  useEffect(() => {
    if (currentId) {
      fetchNoticeDetail(currentId);
    }
  }, [currentId]);

  useEffect(() => {
    if (noticeDetail) {
      setNoticeContents({
        title: noticeDetail?.title || "",
        content: noticeDetail?.content || "",
        author: noticeDetail?.author || "",
        files: noticeDetail?.files.map((file) => ({
          id: file.id,
          file_path: file.file_path,
        })),
      });
    }
  }, [noticeDetail]);

  const { handleChange, updateForm } = useFormData<
    typeof NOTICE_API.method.get,
    typeof NOTICE_API.method.put
  >(NOTICE_API, noticeContents, setNoticeContents);

  const { goToListPage, goToDetailPage } = useBoardAction("support", "notice");
  const { deleteFile, files, deleteFileIds } = useBoardFiles(noticeContents);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentId) {
      alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
    try {
      await updateForm(e, currentId, deleteFileIds);
      goToDetailPage(currentId);
    } catch (error) {
      alert(error);
    }
  };

  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  const isNotLoaded = isLoading.detail || !noticeDetail;

  return !isNotLoaded ? (
    <BoardEditLayout
      type="notice"
      method="update"
      contents={noticeContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListClick={goToListPage}
      handleFileDelete={deleteFile}
      existFiles={files}
      deleteFileIds={deleteFileIds}
    />
  ) : (
    <div>로딩중</div>
  );
}
