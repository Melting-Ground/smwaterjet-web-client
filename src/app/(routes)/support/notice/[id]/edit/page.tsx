"use client";
import React, { useEffect } from "react";
import BoardEditLayout from "../../../_layout/edit/layout";
import { API_URLS } from "../../../../../_config/apiConfig";
import { useState } from "react";
import useFormData from "../../../../../_hooks/useFormData";
import { useParams, useRouter } from "next/navigation";
import { useAPIData } from "../../../../../_hooks/useAPIData";

// 수정 페이지
// TODO: 관리자 외 접근 제한 처리
export default function Edit() {
  const NOTICE_API = API_URLS.notices;
  const router = useRouter();
  const { id } = useParams();

  let currentId: string = "";
  if (typeof id === "string") {
    currentId = id;
  }

  const {
    fetchData: fetchNoticeDetail,
    dataDetail: noticeDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.notices.method.get>(API_URLS.notices);

  // 로딩 상태 확인 후, 데이터가 로드되면 상태를 업데이트
  const [noticeContents, setNoticeContents] = useState<
    typeof NOTICE_API.method.put
  >({
    title: "",
    content: "",
    author: "",
    files: [],
  });

  useEffect(() => {
    fetchNoticeDetail(currentId);
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

  const { handleChange, handleUpdate, handleFileDelete } = useFormData<
    typeof NOTICE_API.method.get,
    typeof NOTICE_API.method.put
  >(NOTICE_API, noticeContents, setNoticeContents);

  //   TODO: 변수명 정리..
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    deletedFileIdArray?: number[]
  ) => {
    try {
      await handleUpdate(e, currentId, deletedFileIdArray);
      router.push(`/support/notice/${currentId}`);
    } catch (error) {
      alert(error);
    }
  };

  // if (!currentId) {
  //   return <div>존재하지 않는 게시물입니다.</div>;
  // }

  const isNotLoaded = isLoading.detail || !noticeDetail;

  return !isNotLoaded ? (
    <BoardEditLayout
      type="notice"
      method="update"
      contents={noticeContents}
      handleChange={handleChange}
      handleSubmit={handleFormSubmit}
      handleDeleteFile={handleFileDelete}
    />
  ) : (
    <div>로딩중</div>
  );
}
