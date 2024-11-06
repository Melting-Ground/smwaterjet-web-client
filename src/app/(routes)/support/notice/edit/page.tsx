"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import Input from "../../../../_components/Input/Input";
import TextArea from "../../../../_components/TextArea/TextArea";

export default function Edit() {
  const NOTICE_API = API_URLS.notices;

  const [noticeContents, setNoticeContents] = useState<
    typeof NOTICE_API.method.post
  >({
    title: "",
    content: "",
    author: "관리자",
    files: null,
  });

  const { handleChange, handleSubmit } = useFormData(
    NOTICE_API,
    noticeContents,
    setNoticeContents
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">작성자</label>
        <Input
          type="text"
          name="author"
          id="author"
          value={noticeContents.author}
          onChange={handleChange}
        />
        <label htmlFor="title">제목</label>
        <Input
          // placeholder="공지사항의 제목을 입력해주세요."
          type="text"
          name="title"
          id="title"
          value={noticeContents.title}
          onChange={handleChange}
          fullWidth
        />
        <label htmlFor="content">내용</label>
        <TextArea
          id="content"
          name="content"
          // placeholder="공지사항의 내용을 입력해주세요."
          value={noticeContents.content}
          onChange={handleChange}
        />
        <label htmlFor="files">첨부 파일</label>
        {/* 파일 선택 */}
        <Input
          type="file"
          name="files"
          id="files"
          multiple
          onChange={handleChange}
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
