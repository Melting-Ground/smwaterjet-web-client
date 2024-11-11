"use client";
import styles from "../../notice/[id]/page.module.scss";
import { useParams } from "next/navigation"; // useParams를 import합니다.
import React, { useEffect } from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "@remixicon/react";
import Link from "next/link";
import { formatDate } from "../../../../_utils/formatDate";
import { API_URLS } from "../../../../_config/apiConfig";
import { useAPIData } from "../../../../_hooks/useAPIData";
import { UserInquiryPasswordContext } from "../../../../_contexts/inquiryContext";
import { useRouter } from "next/navigation";
// TODO: 파일 경로 @

export default function InquiryDetail() {
  const {
    fetchData: fetchInquiryDetail,
    dataList: inquiryList,
    dataDetail: inquiryDetail,
  } = useAPIData<typeof API_URLS.inquiries.method.get>(API_URLS.inquiries);

  const { id } = useParams();
  const { password } = UserInquiryPasswordContext();
  const router = useRouter();

  const getInquiryDetail = async (id: string) => {
    const errorMessage = await fetchInquiryDetail(id, password);
    if (errorMessage) {
      alert(errorMessage);
      router.push("/support/inquiry");
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      getInquiryDetail(id);
    }
  }, [id]);

  // 배열의 인덱스
  const currentIndex = inquiryList.findIndex(
    (inquiry) => inquiry.id === Number(id)
  );
  const previousIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  return (
    <div className={styles.container}>
      {inquiryDetail && (
        <article className={styles["inquiry-article"]}>
          <h3 className={styles["head-title"]}>{inquiryDetail.title}</h3>
          <ul className={styles["head-sub"]}>
            <li>
              <span className={styles.title}>첨부파일</span>
              <span className={styles["info-item"]}>
                {/* {inquiryDetail.files.length > 0
                  ? inquiryDetail.files[0].file_path.split("/")[2]
                  : null} */}
              </span>
            </li>

            <li>
              <span className={styles.title}>작성일</span>
              <span className={styles["info-item"]}>
                <time dateTime={inquiryDetail.created_at}>
                  {formatDate(inquiryDetail.created_at)}
                </time>
              </span>
            </li>
          </ul>
          <p className={styles.content}>{inquiryDetail.content}</p>
          <ul className={styles["inquiry-nav"]}>
            <li className={styles["inquiry-nav-item"]}>
              <span>
                <p>이전글</p>
                <RiArrowUpSFill size={18} />
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <Link
                    href={`/support/inquiry/${inquiryList[previousIndex].id}`}
                  >
                    {inquiryList[previousIndex].title}
                  </Link>
                ) : (
                  "이전 글이 없습니다."
                )}
              </span>
              <span>
                {previousIndex >= 0 ? (
                  <time dateTime={inquiryList[previousIndex].created_at}>
                    {formatDate(inquiryList[previousIndex].created_at)}
                  </time>
                ) : (
                  ""
                )}
              </span>
            </li>
            <li className={styles["inquiry-nav-item"]}>
              <span>
                <p>다음글</p>
                <RiArrowDownSFill size={18} />
              </span>
              <span>
                {nextIndex < inquiryList.length ? (
                  <Link href={`/support/inquiry/${inquiryList[nextIndex].id}`}>
                    {inquiryList[nextIndex].title}
                  </Link>
                ) : (
                  "다음 글이 없습니다."
                )}
              </span>
              <span>
                {nextIndex < inquiryList.length ? (
                  <time dateTime={inquiryList[nextIndex].created_at}>
                    {formatDate(inquiryList[nextIndex].created_at)}
                  </time>
                ) : (
                  ""
                )}
              </span>
            </li>
          </ul>
        </article>
      )}
    </div>
  );
}
