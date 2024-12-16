"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";
import useFormData from "@/_hooks/useFormData";
import { API_URLS } from "@/_config/apiConfig";

export default function Edit() {
  const CERTIFICATE_API = API_URLS.certificates;
  const [certificate, setCertificate] = useState<
    typeof CERTIFICATE_API.method.post
  >({
    title: "",
    file: null,
  });

  const { uploadForm } = useFormData<
    typeof API_URLS.certificates.method.get,
    typeof API_URLS.certificates.method.post
  >(API_URLS.certificates, certificate, setCertificate);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!certificate) {
      console.error("파일을 선택하세요.");
      return;
    }

    try {
      await uploadForm(e);
    } catch (error) {
      console.error("에러", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setCertificate({ ...certificate, file });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: title } = e.target;
    setCertificate({ ...certificate, title });
  };

  return (
    <div className={styles.container}>
      <button onClick={() => console.log(certificate)}>확인</button>
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
