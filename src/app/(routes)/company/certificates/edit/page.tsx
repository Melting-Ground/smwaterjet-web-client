"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import axiosInstance from "../../../../_config/axiosInstance";

export default function Edit() {
  const [certificate, setCertificate] = useState<File | null>(null); // 초기값을 null로 설정

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!certificate) {
      console.error("파일을 선택하세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", certificate); // 파일을 FormData에 추가합니다.

      const response = await axiosInstance.post(
        "/company/certificates",
        formData,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일 선택 시 첫 번째 파일을 가져옵니다.
    if (file) {
      setCertificate(file); // 선택한 파일을 상태에 저장합니다.
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">
          파일 선택
          <input type="file" name="files" id="file" onChange={handleChange} />
        </label>
        <button type="submit">업로드</button>
      </form>
    </div>
  );
}
