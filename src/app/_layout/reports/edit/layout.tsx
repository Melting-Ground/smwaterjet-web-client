"use client";
import React from "react";
import styles from "./layout.module.scss";
import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";
import DateInput from "@/_components/DateInput/DateInput";
import Select from "@/_components/Select/Select";
import { ReportPostType } from "@/_types/report";
import { formatDate } from "@/_utils/formatDate";

interface EditProps<ReportPostType> {
  contents?: ReportPostType;
  handleChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleListClick: () => void;
}

// TODO: 자동 등록 방지
export default function BoardEditLayout({
  contents,
  handleChange,
  handleSubmit,
  handleListClick,
}: EditProps<ReportPostType>) {
  const currentYear = new Date().getFullYear();
  const yearList = Array.from(
    { length: currentYear + 1 - 2010 },
    (_, i) => 2010 + i
  );

  // TODO: * 표시 하기 (필수항목)
  //   문의사항의 경우 더 항목이 많음
  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">공사명</label>
        <Input
          type="text"
          name="title"
          id="title"
          required
          value={contents?.title}
          onChange={handleChange}
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

        <label htmlFor="title">시작일</label>
        <DateInput
          id="start_date"
          year={Number(contents?.year)}
          value={formatDate(contents?.start_date.toString() ?? "")}
          onChange={handleChange}
        />

        <label htmlFor="title">종료일</label>
        <DateInput
          id="end_date"
          year={Number(contents?.year)}
          value={formatDate(contents?.end_date.toString() ?? "")}
          onChange={handleChange}
        />

        <label htmlFor="title">비고</label>
        <Input
          type="text"
          name="note"
          id="note"
          disabled
          onChange={handleChange}
          placeholder="-"
          required={false}
          value={contents?.note ?? ""} // null
        />

        <div className={styles["button-container"]}>
          <Button
            type="submit"
            color="primary-border"
            onClick={handleListClick}
          >
            취소
          </Button>
          <Button type="submit" color="primary">
            작성 완료
          </Button>
        </div>
      </form>
    </section>
  );
}
