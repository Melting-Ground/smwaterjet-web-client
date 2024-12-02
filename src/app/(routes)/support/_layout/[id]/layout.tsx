"use client";
import styles from "./layout.module.scss";
import React from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "@remixicon/react";
import Link from "next/link";
import { formatDate } from "../../../../_utils/formatDate";
import { downloadFile } from "../../../../_utils/downloadFile";
import Button from "../../../../_components/Button/Button";
import { RiFile2Line } from "@remixicon/react";
import { NoticeType } from "../../../../_types/notice";
import { InquiryType } from "../../../../_types/inquiry";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../_hooks/useAuth";
import { API_URLS } from "../../../../_config/apiConfig";
import useFormData from "../../../../_hooks/useFormData";

interface DetailProps<T> {
  dataDetail: T;
  dataList: T[];
  currentId: number;
  type: "notice" | "inquiry";
}

export default function BoardDetailLayout<T extends NoticeType | InquiryType>({
  dataDetail,
  dataList,
  currentId,
  type,
}: DetailProps<T>) {
  // 배열의 인덱스
  const currentIndex = dataList.findIndex((data) => data.id === currentId);
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const apiConfig = type === "notice" ? API_URLS.notices : API_URLS.inquiries;
  const { handleDelete } = useFormData(apiConfig);

  const goToList = () => {
    router.push(`/support/${type}`);
  };

  const goToEditPage = () => {
    router.push(`/support/${type}/${currentId}/edit`);
  };

  const deleteItem = async (id: string) => {
    const isDeleted = await handleDelete(id);
    if (isDeleted) {
      router.push(`/support/${type}`);
    }
  };

  return (
    <div className={styles.container}>
      {dataDetail && (
        <article className={styles.article}>
          <h3 className={styles["head-title"]}>{dataDetail.title}</h3>
          <ul className={styles["head-sub"]}>
            <li className={styles["attachment-file"]}>
              <span className={styles.title}>첨부파일</span>
              <span className={styles["info-item"]}>
                {dataDetail.files.length > 0
                  ? dataDetail.files.map((file, index) => (
                      <span key={index} className={styles["file-download"]}>
                        <Button
                          className={styles["file-download-button"]}
                          color="transparent-link"
                          onClick={() => {
                            downloadFile(file); // 각 파일에 대한 다운로드 함수 호출
                          }}
                        >
                          <RiFile2Line size={16} color="#75767f" />
                          {file.file_path.split("/")[2]}{" "}
                          {/* 파일 경로에서 파일명 추출 */}
                        </Button>
                      </span>
                    ))
                  : null}
              </span>
            </li>
            <li>
              {type === "notice" && "count" in dataDetail ? (
                <>
                  <span className={styles.title}>조회수</span>
                  <span className={styles["info-item"]}>
                    {dataDetail.count}
                  </span>
                </>
              ) : null}
            </li>
            <li>
              <span className={styles.title}>작성일</span>
              <span className={styles["info-item"]}>
                <time dateTime={dataDetail.created_at}>
                  {formatDate(dataDetail.created_at)}
                </time>
              </span>
            </li>
          </ul>
          <p className={styles.content}>{dataDetail.content}</p>
          <ul className={styles.nav}>
            <li className={styles["nav-item"]}>
              <span>
                <p>이전글</p>
                <RiArrowUpSFill size={18} />
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <Link
                    href={
                      type === "inquiry"
                        ? `/support/${type}/${dataList[previousIndex].id}/password`
                        : `/support/${type}/${dataList[previousIndex].id}`
                    }
                  >
                    {dataList[previousIndex].title}
                  </Link>
                ) : (
                  "이전 글이 없습니다."
                )}
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <time dateTime={dataList[previousIndex].created_at}>
                    {formatDate(dataList[previousIndex].created_at)}
                  </time>
                ) : (
                  ""
                )}
              </span>
            </li>
            <li className={styles["nav-item"]}>
              <span>
                <p>다음글</p>
                <RiArrowDownSFill size={18} />
              </span>
              <span>
                {nextIndex < dataList.length ? (
                  <Link
                    href={
                      type === "inquiry"
                        ? `/support/${type}/${dataList[nextIndex].id}/password`
                        : `/support/${type}/${dataList[nextIndex].id}`
                    }
                  >
                    {dataList[nextIndex].title}
                  </Link>
                ) : (
                  "다음 글이 없습니다."
                )}
              </span>
              <span>
                {nextIndex < dataList.length ? (
                  <time dateTime={dataList[nextIndex].created_at}>
                    {formatDate(dataList[nextIndex].created_at)}
                  </time>
                ) : (
                  ""
                )}
              </span>
            </li>
          </ul>
        </article>
      )}
      <span className={styles["button-container"]}>
        <Button
          color="primary"
          className={styles["to-list-button"]}
          onClick={goToList}
        >
          목록으로
        </Button>
        {isLoggedIn ? (
          <span className={styles["edit-del-button-container"]}>
            <Button color="primary-border" onClick={goToEditPage}>
              수정
            </Button>
            <Button
              color="red"
              onClick={() => deleteItem(currentId.toString())}
            >
              삭제
            </Button>
          </span>
        ) : null}
      </span>
    </div>
  );
}
