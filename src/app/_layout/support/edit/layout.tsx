"use client";
import styles from "./layout.module.scss";
import Input from "@/_components/Input/Input";
import TextArea from "@/_components/TextArea/TextArea";
import Button from "@/_components/Button/Button";
import { NoticePostType } from "@/_types/notice";
import { InquiryPostType } from "@/_types/inquiry";
import { RiCloseCircleLine } from "@remixicon/react";
import { FileWithIdType } from "@/_types/file";
import { BoardType, EditMethodType } from "@/_types/board";
import { Fragment } from "react";

// TODO: 레이아웃 상위 폴더로 옮기기
interface EditProps<T> {
  contents: T;
  type: BoardType;
  method: EditMethodType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    method?: EditMethodType
  ) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    setDeletedFileIdArray?: number[]
  ) => Promise<void>;
  handleListClick: () => void;
  existFiles?: (FileWithIdType | File | null)[]; // 원래 있던 파일
  handleFileDelete?: (id: string) => void; // update인 경우에만
  deleteFileIds?: number[]; // update인 경우에만
  passwordRegex?: string;
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
  handleListClick,
  handleFileDelete,
  existFiles,
  deleteFileIds,
  passwordRegex,
}: EditProps<T>) {
  // TODO: * 표시 하기 (필수항목)
  //   문의사항의 경우 더 항목이 많음
  console.log("existFiles", existFiles);
  const files = existFiles ?? contents.files;
  const RequiredMark = () => {
    return <span className={styles["required-mark"]}>*</span>;
  };

  return (
    <section className={styles.container}>
      <form
        onSubmit={(e) => handleSubmit(e, deleteFileIds)}
        className={styles.form}
      >
        <label htmlFor="title">
          {type === "inquiry" ? (
            <>
              성함 <RequiredMark />
            </>
          ) : (
            <>
              작성자 <RequiredMark />
            </>
          )}
        </label>
        <Input
          type="text"
          name="author"
          id="author"
          value={contents.author}
          onChange={(e) => handleChange(e, method)}
          required
          disabled={method === "update" ? true : false}
        />
        {type === "inquiry" &&
        contents &&
        "password" in contents &&
        "phone_number" in contents &&
        "email" in contents ? (
          <>
            <label htmlFor="password">
              비밀번호 <RequiredMark />
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={contents.password}
              onChange={(e) => handleChange(e, method)}
              required
              disabled={method === "update" ? true : false}
            />
            {passwordRegex ? <span /> : null}
            {passwordRegex ? (
              <span className={styles["password-label"]}>
                * {passwordRegex}합니다.
              </span>
            ) : null}

            <label htmlFor="phone_number">
              연락처 <RequiredMark />
            </label>
            <Input
              type="text"
              name="phone_number"
              id="phone_number"
              value={contents.phone_number}
              onChange={(e) => handleChange(e, method)}
              required
              disabled={method === "update" ? true : false}
            />

            <label htmlFor="email">
              이메일 <RequiredMark />
            </label>
            <Input
              type="text"
              name="email"
              id="email"
              value={contents.email}
              onChange={(e) => handleChange(e, method)}
              required
              disabled={method === "update" ? true : false}
            />
          </>
        ) : null}

        <label htmlFor="title">
          제목 <RequiredMark />
        </label>
        <Input
          type="text"
          name="title"
          id="title"
          value={contents.title}
          onChange={(e) => handleChange(e, method)}
          required
          fullWidth
          disabled={method === "update" ? true : false}
        />
        <label htmlFor="content">
          내용 <RequiredMark />
        </label>
        <TextArea
          id="content"
          name="content"
          required
          value={contents.content}
          onChange={(e) => handleChange(e, method)}
        />
        {/* 파일 선택 1~5개 */}
        {files.map((file, index) => (
          <Fragment key={index}>
            <label htmlFor={`file${index + 1}`}>첨부 파일{index + 1}</label>
            {!(file instanceof File) && file !== null ? (
              <div className={styles["exist-file-container"]}>
                {file.file_path}
                <Button
                  ariaLabel="삭제하기"
                  onClick={() => {
                    if (!handleFileDelete) return;
                    handleFileDelete(file.id.toString());
                  }}
                  color="icon"
                  className={styles["file-delete-button"]}
                  icon={<RiCloseCircleLine color={"#2f437a"} />}
                />
              </div>
            ) : (
              <Input
                className={styles["file-input"]}
                type="file"
                name={`file${index + 1}`}
                id={`file${index + 1}`}
                onChange={(e) => handleChange(e, method)}
              />
            )}
          </Fragment>
        ))}
        {/* 자동방지등록 */}
        <div className={styles["button-container"]}>
          <Button
            ariaLabel="취소하기"
            type="button"
            color="primary-border"
            onClick={handleListClick}
          >
            취소
          </Button>
          <Button ariaLabel="작성 완료" type="submit" color="primary">
            작성 완료
          </Button>
        </div>
      </form>
    </section>
  );
}
