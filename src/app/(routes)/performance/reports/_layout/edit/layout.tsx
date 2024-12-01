"use client";
import React, { useState } from "react";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import Input from "../../../../../_components/Input/Input";
import Button from "../../../../../_components/Button/Button";
import DateInput from "../../../../../_components/DateInput/DateInput";
import Select from "../../../../../_components/Select/Select";
import { ReportsPostType } from "../../../../../_types/report";

// TODO: 레이아웃 상위 폴더로 옮기기
interface EditProps<ReportsPostType> {
  contents?: ReportsPostType;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  //   isFormDirty?: boolean;
}

// TODO: 자동 등록 방지
export default function BoardEditLayout({
  contents,
  handleChange,
  handleSubmit,
}: //   isFormDirty,
EditProps<ReportsPostType>) {
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const yearList = Array.from(
    { length: currentYear + 1 - 2010 },
    (_, i) => 2010 + i
  );
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(value);
    setSelectedYear(Number(value));
  };

  const goBackToList = () => {
    // if (isFormDirty) {
    //   const confirmation = window.confirm(
    //     "변경 사항이 저장되지 않을 수 있습니다."
    //   );
    //   if (confirmation) {
    //     router.push("/performance/reports");
    //   }
    // }
    // else {

    router.push("/support/reports");
    // }
  };

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
          onChange={handleYearChange}
          value={contents?.year.toString()}
        />

        <label htmlFor="title">시작일</label>
        <DateInput
          id="startDate"
          year={selectedYear}
          value={contents?.startDate.toString()}
          onChange={handleChange}
        />

        <label htmlFor="title">종료일</label>
        <DateInput
          id="endDate"
          year={selectedYear}
          value={contents?.endDate.toString()}
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
          <Button type="submit" color="primary-border" onClick={goBackToList}>
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
