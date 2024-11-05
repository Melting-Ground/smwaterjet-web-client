"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import useFormData from "../../../../_hooks/useFormData";
import { NoticePostType } from "../../../../_types/notice";
import { API_URLS } from "../../../../_config/apiConfig";

export default function Edit() {
  const [noticeContents, setNoticeContents] = useState<NoticePostType>({
    title: "",
    content: "",
    author: "admin",
    files: null,
  });

  const { handleChange, handleSubmit } = useFormData(
    API_URLS.notices,
    noticeContents,
    setNoticeContents
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          value={noticeContents.title}
          onChange={handleChange}
          placeholder="제목"
        />
        <textarea
          id="content"
          name="content"
          value={noticeContents.content}
          onChange={handleChange}
          placeholder="내용"
        />
        <label>
          파일 선택
          <input
            type="file"
            name="files"
            id="files"
            multiple
            onChange={handleChange}
          />
        </label>
        <button type="submit">확인</button>
      </form>
    </div>
  );
}
