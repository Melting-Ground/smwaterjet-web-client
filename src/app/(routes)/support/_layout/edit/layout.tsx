"use client";
import React, { useEffect, useState } from "react";
import styles from "./layout.module.scss";
import Input from "../../../../_components/Input/Input";
import TextArea from "../../../../_components/TextArea/TextArea";
import Button from "../../../../_components/Button/Button";
import { useRouter } from "next/navigation";
import { NoticePostType } from "../../../../_types/notice";
import { InquiryPostType } from "../../../../_types/inquiry";
import { RiCloseCircleLine } from "@remixicon/react";
import { FileWithIdType } from "../../../../_types/file";
import { BoardType, EditMethodType } from "../../../../_types/board";

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

  console.log("contents", contents);

  const [files, setFiles] = useState<(FileWithIdType | File | null)[]>([]);
  const [deleteFileIdArray, setDeleteFileIdArray] = useState<number[]>([]);

  useEffect(() => {
    const updatedFiles: (FileWithIdType | File | null)[] = [];
    contents.files.forEach((file) => {
      if (!file || file instanceof File) {
        return;
      }
      updatedFiles.push({ id: file.id, file_path: file.file_path });
    });

    for (let i = 0; i < 5 - contents.files.length; i++) {
      updatedFiles.push(null);
    }
    setFiles(updatedFiles);
  }, [contents.files]);

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
  const deleteFile = (id: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file?.id.toString() === id ? null : file))
    );
    setDeleteFileIdArray((prev) => [...prev, Number(id)]);
  };

  // TODO: * 표시 하기 (필수항목)
  //   문의사항의 경우 더 항목이 많음
  return (
    <section className={styles.container}>
      <form
        onSubmit={(e) => handleSubmit(e, deleteFileIdArray)}
        className={styles.form}
      >
        <label htmlFor="title">
          {type === "inquiry" ? <>성함</> : <>작성자</>}
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
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              name="password"
              id="password"
              value={contents.password}
              onChange={(e) => handleChange(e, method)}
              required
              disabled={method === "update" ? true : false}
            />

            <label htmlFor="phone_number">연락처</label>
            <Input
              type="text"
              name="phone_number"
              id="phone_number"
              value={contents.phone_number}
              onChange={(e) => handleChange(e, method)}
              required
              disabled={method === "update" ? true : false}
            />

            <label htmlFor="email">이메일</label>
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

        <label htmlFor="title">제목</label>
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
        <label htmlFor="content">내용</label>
        <TextArea
          id="content"
          name="content"
          value={contents.content}
          onChange={(e) => handleChange(e, method)}
        />
        {/* 파일 선택 1~5개 */}
        {files.map((file, index) => (
          <React.Fragment key={index}>
            <label htmlFor={`file${index + 1}`}>첨부 파일{index + 1}</label>
            {!(file instanceof File) && file !== null ? (
              <div className={styles["exist-file-container"]}>
                {file.file_path}
                <Button
                  onClick={() => {
                    deleteFile(file.id.toString());
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
