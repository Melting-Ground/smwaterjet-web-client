"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import Input from "../../../../_components/Input/Input";
import TextArea from "../../../../_components/TextArea/TextArea";
import Button from "../../../../_components/Button/Button";

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

  const fileInputs = Array.from({ length: 5 }, (_, index) => index + 1);

  // TODO: * 표시 하기 (필수항목)
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
        {/* 파일 선택 1~5개 */}
        {fileInputs.map((num) => (
          <React.Fragment key={num}>
            <label htmlFor={`file${num}`}>첨부 파일{num}</label>
            <Input
              className={styles["file-input"]}
              type="file"
              name={`file${num}`}
              id={`file${num}`}
              onChange={handleChange}
            />
          </React.Fragment>
        ))}
        <div>
          <Button type="submit" color="primary-border">
            취소
          </Button>
          <Button type="submit" color="primary">
            작성 완료
          </Button>
        </div>
      </form>
    </div>
  );
}
