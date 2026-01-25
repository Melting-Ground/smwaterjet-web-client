"use client";
import React from "react";
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
  const fileList = existFiles?.filter(
    (file): file is FileWithIdType => Boolean(file)
  );
  const displayFiles = fileList?.slice(1);

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
        <label htmlFor="files" className={styles["section-label"]}>
          첨부파일
        </label>
        {displayFiles && displayFiles.length > 0
          ? displayFiles.map((file, index) => (
              <React.Fragment key={file.id}>
                <span className={styles["exist-file-label"]}>
                  첨부 파일 {index + 1}
                </span>
                <div className={styles["exist-file-container"]}>
                  <span className={styles["file-name"]}>
                    {file.file_path.split("/").pop()}
                  </span>
                  <Button
                    ariaLabel="파일 삭제"
                    onClick={() =>
                      handleFileDelete && handleFileDelete(file.id.toString())
                    }
                    color="icon"
                    className={styles["file-delete-button"]}
                    icon={<RiCloseCircleLine color={"#2f437a"} />}
                  />
                </div>
              </React.Fragment>
            ))
          : null}
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
