"use client";
import React, { useEffect } from "react";
import BoardEditLayout from "@/_layout/support/edit/layout";
import { API_URLS } from "@/_config/apiConfig";
import { useState } from "react";
import useFormData from "@/_hooks/useFormData";
import { useParams } from "next/navigation";
import { useAPIData } from "@/_hooks/useAPIData";
import { UserInquiryPasswordContext } from "@/_contexts/inquiryContext";
import useBoardAction from "@/_hooks/useBoardAction";
import useBoardFiles from "@/_hooks/useBoardFiles";
import { useAuth } from "@/_hooks/useAuth";

// 수정 페이지
// TODO: 관리자 외 접근 제한 처리
export default function Edit() {
  const INQUIRY_API = API_URLS.inquiries;
  const { id } = useParams();
  const { password } = UserInquiryPasswordContext();

  const currentId = typeof id === "string" ? id : undefined;

  const {
    fetchData: fetchInquiryDetail,
    dataDetail: inquiryDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.inquiries.method.get>(API_URLS.inquiries);

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
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if ((currentId && password) || (currentId && isLoggedIn)) {
      fetchInquiryDetail(currentId, password);
    }
  }, [currentId]);

  useEffect(() => {
    if (inquiryDetail) {
      console.log(inquiryContents);
      setInquiryContents({
        author: inquiryDetail?.author || "",
        phone_number: inquiryDetail?.phone_number || "",
        password: password || "",
        email: inquiryDetail?.email || "",
        title: inquiryDetail?.title || "",
        content: inquiryDetail?.content || "",
        files: inquiryDetail?.files.map((file) => ({
          id: file.id,
          file_path: file.file_path,
        })),
      });
    }
  }, [inquiryDetail]);

  const { handleChange, updateForm } = useFormData<
    typeof INQUIRY_API.method.get,
    typeof INQUIRY_API.method.put
  >(INQUIRY_API, inquiryContents, setInquiryContents);

  const { goToListPage, goToDetailPage } = useBoardAction("support", "inquiry");
  const { deleteFile, files, deleteFileIds } = useBoardFiles(inquiryContents);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentId) {
      alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      return;
    }
    try {
      await updateForm(e, currentId, deleteFileIds, password);
      goToDetailPage(currentId);
    } catch (error) {
      alert(error);
    }
  };

  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  const isNotLoaded = isLoading.detail || !inquiryDetail;

  return !isNotLoaded ? (
    <BoardEditLayout
      type="inquiry"
      method="update"
      contents={inquiryContents}
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
