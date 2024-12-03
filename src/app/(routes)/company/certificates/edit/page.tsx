"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import axiosInstance from "@/_config/axiosInstance";
import { getToken } from "@/_utils/getAuth";
import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";

export default function Edit() {
  const [certificate, setCertificate] = useState<File | null>(null); // 초기값을 null로 설정
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getToken();

    if (!certificate) {
      console.error("파일을 선택하세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", certificate);
      formData.append("title", title);

      const response = await axiosInstance.post(
        "/company/certificates",
        formData,
        // TODO: 제목을 함께 넘겨줘야 함
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // 파일 업로드 시 Content-Type 설정
          },
        }
      );
      console.log("response", response);
    } catch (error) {
      console.error("에러", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setCertificate(file);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">파일 선택</label>
        <input type="file" name="files" id="file" onChange={handleFileChange} />
        <label htmlFor="file">제목</label>
        <Input name="title" id="title" onChange={handleTitleChange} />
        <Button type="submit" color="primary">
          업로드
        </Button>
      </form>
    </div>
  );
}
