"use client";
import React from "react";
import styles from "./layout.module.scss";
import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";
import DateInput from "@/_components/DateInput/DateInput";
import Select from "@/_components/Select/Select";
import { ReportPostType } from "@/_types/report";
import { formatDate } from "@/_utils/formatDate";
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
  const currentYear = new Date().getFullYear();
  const yearList = Array.from(
    { length: currentYear + 1 - 2010 },
    (_, i) => 2010 + i
  );

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
        <label htmlFor="title">공사년도</label>
        <Select
          id="year"
          selectList={yearList}
          initialValue={currentYear}
          placeholder="공사년도"
          onChange={handleChange}
          value={contents?.year.toString()}
        />
        <label htmlFor="title">첨부사진</label>
        <Input
          className={styles["file-input"]}
          type="file"
          name={`file${1}`}
          id={`file${1}`}
          onChange={(e) => handleChange(e, method, false)}
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
