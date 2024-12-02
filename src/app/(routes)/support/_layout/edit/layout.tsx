"use client";
import React from "react";
import styles from "./layout.module.scss";
import Input from "../../../../_components/Input/Input";
import TextArea from "../../../../_components/TextArea/TextArea";
import Button from "../../../../_components/Button/Button";
import { useRouter } from "next/navigation";
import { NoticePostType } from "../../../../_types/notice";
import { InquiryPostType } from "../../../../_types/inquiry";

// TODO: 레이아웃 상위 폴더로 옮기기
interface EditProps<T> {
  contents: T;
  type: "notice" | "inquiry";
  method: "update" | "upload";
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isFormDirty: boolean;
}

// TODO: 자동 등록 방지
export default function BoardEditLayout<
  T extends NoticePostType | InquiryPostType
>({
  contents,
  type,
  method,
  handleChange,
  handleSubmit,
  isFormDirty,
}: EditProps<T>) {
  const router = useRouter();

  const fileInputs = Array.from({ length: 5 }, (_, index) => index + 1);

  const goBackToList = () => {
    if (isFormDirty) {
      const confirmation = window.confirm(
        "변경 사항이 저장되지 않을 수 있습니다."
      );
      if (confirmation) {
        router.push(`/support/${type}`);
      }
    } else {
      router.push(`/support/${type}`);
    }
  };

  // TODO: * 표시 하기 (필수항목)
  //   문의사항의 경우 더 항목이 많음
  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">
          {type === "inquiry" ? <>성함</> : <>작성자</>}
        </label>
        <Input
          type="text"
          name="author"
          id="author"
          value={contents.author}
          onChange={handleChange}
          required
          disabled={method === "update" ? true : false}
        />
        {type === "inquiry" &&
        contents &&
        "password" in contents &&
        "phone_number" in contents &&
        "email" in contents ? (
          <>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              name="password"
              id="password"
              value={contents.password}
              onChange={handleChange}
              required
              disabled={method === "update" ? true : false}
            />

            <label htmlFor="phone_number">연락처</label>
            <Input
              type="text"
              name="phone_number"
              id="phone_number"
              value={contents.phone_number}
              onChange={handleChange}
              required
              disabled={method === "update" ? true : false}
            />

            <label htmlFor="email">이메일</label>
            <Input
              type="text"
              name="email"
              id="email"
              value={contents.email}
              onChange={handleChange}
              required
              disabled={method === "update" ? true : false}
            />
          </>
        ) : null}

        <label htmlFor="title">제목</label>
        <Input
          type="text"
          name="title"
          id="title"
          value={contents.title}
          onChange={handleChange}
          required
          fullWidth
          disabled={method === "update" ? true : false}
        />
        <label htmlFor="content">내용</label>
        <TextArea
          id="content"
          name="content"
          value={contents.content}
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
        {/* 자동방지등록 */}
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
