"use client";
import React, { useState } from "react";
// import styles from "./page.module.scss";
import styles from "@/_layout/support/edit/layout.module.scss";

import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";
import useFormData from "@/_hooks/useFormData";
import { API_URLS } from "@/_config/apiConfig";
import useBoardAction from "@/_hooks/useBoardAction";

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
  const { goToListPage } = useBoardAction("company", "certificates");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!certificate) {
      console.error("파일을 선택하세요.");
      return;
    }

    try {
      await uploadForm(e);
      goToListPage();
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="file">파일 선택</label>
        <Input
          type="file"
          name="files"
          id="file"
          onChange={handleFileChange}
          className={styles["file-input"]}
        />
        <label htmlFor="file">제목</label>
        <Input name="title" id="title" onChange={handleTitleChange} fullWidth />
        <div className={styles["button-container"]}>
          <Button type="button" color="primary-border" onClick={goToListPage}>
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
