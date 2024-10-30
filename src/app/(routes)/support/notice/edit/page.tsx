"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import axiosInstance from "../../../../_config/axiosInstance";

export default function Edit() {
  const [noticeContents, setNoticeContents] = useState<{
    title: string;
    content: string;
    username: string;
  }>({
    title: "",
    content: "",
    username: "test",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    // 텍스트 데이터 추가
    formData.append("title", noticeContents.title);
    formData.append("content", noticeContents.content);
    formData.append("username", noticeContents.username);

    // 파일 추가
    const element = document.getElementById("files") as HTMLInputElement;
    if (element) {
      const files = element.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
          console.log(`Added file: ${files[i].name}`); // 추가된 파일명 로그 출력
        }
      }
    }
    // FormData 내용 확인
    formData.forEach((value, key) => {
      console.log(key, value); // FormData의 내용을 확인
    });
    const token = localStorage.getItem("token");

    try {
      // 올바른 데이터 형식으로 요청 전송
      const response = await axiosInstance.post("/support/notices", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          // "Content-Type"은 자동으로 설정됨
        },
      });
      console.log("response", response);
    } catch (error) {
      console.error("에러", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target as HTMLInputElement;

    setNoticeContents((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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
          <input type="file" name="files" id="files" multiple />
        </label>
        <button type="submit">확인</button>
      </form>
    </div>
  );
}
