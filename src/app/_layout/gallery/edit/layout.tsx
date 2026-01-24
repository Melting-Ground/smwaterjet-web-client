"use client";
import React from "react";
import styles from "./layout.module.scss";
import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";
import { PhotoPostType } from "@/_types/photo";
import { EditMethodType } from "@/_types/board";

interface EditProps<PhotoPostType> {
  contents?: PhotoPostType;
  method: EditMethodType;

  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    method?: EditMethodType,
    multiplePhotos?: boolean
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleListClick: () => void;
}

export default function GalleryEditLayout({
  contents,
  method,
  handleChange,
  handleSubmit,
  handleListClick,
}: EditProps<PhotoPostType>) {
  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">제목</label>
        <Input
          type="text"
          name="title"
          id="title"
          required
          value={contents?.title}
          onChange={handleChange}
          fullWidth
        />
        <label htmlFor="title">첨부사진</label>
        <Input
          className={styles["file-input"]}
          type="file"
          name="files"
          id="files"
          multiple
          onChange={(e) => handleChange(e, method, true)}
        />
        <div className={styles["button-container"]}>
          <Button
            ariaLabel="취소하기"
            type="button"
            color="primary-border"
            onClick={handleListClick}
          >
            취소
          </Button>
          <Button ariaLabel="등록" type="submit" color="primary">
            등록
          </Button>
        </div>
      </form>
    </section>
  );
}
