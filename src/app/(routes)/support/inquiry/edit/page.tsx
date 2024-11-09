"use client";
import React, { useState } from "react";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import styles from "../../notice/edit/page.module.scss"; // TODO: 공통 스타일이므로 이름 수정하기
import Button from "../../../../_components/Button/Button";
import Input from "../../../../_components/Input/Input";
import TextArea from "../../../../_components/TextArea/TextArea";

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

  const { handleChange, handleSubmit } = useFormData<
    typeof INQUIRY_API.method.get,
    typeof INQUIRY_API.method.post
  >(INQUIRY_API, inquiryContents, setInquiryContents);

  const fileInputs = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">성함</label>
        <Input
          type="text"
          name="author"
          id="author"
          value={inquiryContents.author}
          onChange={handleChange}
        />
        <label htmlFor="password">비밀번호</label>
        <Input
          type="password"
          name="password"
          id="password"
          value={inquiryContents.password}
          onChange={handleChange}
        />
        <label htmlFor="phone_number">연락처</label>
        <Input
          type="text"
          name="phone_number"
          id="phone_number"
          value={inquiryContents.phone_number}
          onChange={handleChange}
        />
        <label htmlFor="phone_number">이메일</label>
        <Input
          type="text"
          name="email"
          id="email"
          value={inquiryContents.email}
          onChange={handleChange}
        />
        <label htmlFor="title">제목</label>
        <Input
          type="text"
          name="title"
          id="title"
          value={inquiryContents.title}
          onChange={handleChange}
          fullWidth
        />
        <label htmlFor="content">내용</label>
        <TextArea
          id="content"
          name="content"
          value={inquiryContents.content}
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
