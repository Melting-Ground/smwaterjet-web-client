"use client";
import React, { Fragment } from "react";
import styles from "./layout.module.scss";
import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";
import { PhotoPostType } from "@/_types/photo";
import { EditMethodType } from "@/_types/board";
import { FileWithIdType } from "@/_types/file";
import { RiCloseCircleLine } from "@remixicon/react";

interface EditProps<PhotoPostType> {
  contents?: PhotoPostType;
  method: EditMethodType;
  existFiles?: (FileWithIdType | null)[];
  handleFileDelete?: (id: string) => void;

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
  existFiles,
  handleFileDelete,
  handleChange,
  handleSubmit,
  handleListClick,
}: EditProps<PhotoPostType>) {
  const files = existFiles ?? contents?.files ?? [];
  const normalizedFiles = Array.from({ length: 5 }, (_, index) => files[index] ?? null);

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
        <label className={styles["section-label"]}>첨부파일</label>
        {normalizedFiles.map((file, index) => (
          <Fragment key={index}>
            <span className={styles["exist-file-label"]}>
              {index === 0 ? "대표 사진" : `첨부 파일 ${index}`}
            </span>
            {file && !(file instanceof File) ? (
              <div className={styles["exist-file-container"]}>
                <span className={styles["file-name"]}>
                  {file.file_path.split("/").pop()}
                </span>
                {index === 0 ? null : (
                  <Button
                    ariaLabel="파일 삭제"
                    onClick={() =>
                      handleFileDelete && handleFileDelete(file.id.toString())
                    }
                    color="icon"
                    className={styles["file-delete-button"]}
                    icon={<RiCloseCircleLine color={"#2f437a"} />}
                  />
                )}
              </div>
            ) : (
              <Input
                className={styles["file-input"]}
                type="file"
                name={`file${index + 1}`}
                id={`file${index + 1}`}
                accept={index === 0 ? "image/*" : "image/*,video/*"}
                required={method === "upload" && index === 0}
                onChange={(e) => handleChange(e, method)}
              />
            )}
          </Fragment>
        ))}
        <div className={styles["button-container"]}>
          <Button
            ariaLabel="취소"
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
