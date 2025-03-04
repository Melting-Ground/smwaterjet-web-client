"use client";
import styles from "./page.module.scss";
import { useAPIData } from "./_hooks/useAPIData";
import { API_URLS } from "./_config/apiConfig";
import { useEffect } from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";
import { formatDate } from "./_utils/formatDate";
import landingPageImage from "/public/images/background-image.jpg";
import Image from "next/image";
interface ListItemProps {
  title: string;
  content: JSX.Element;
  link: string;
}

function ListItem({ title, content, link }: ListItemProps) {
  return (
    <section className={styles["list-item"]}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {content}
      </div>
      {/* <Button className={styles["more-button"]} href={link} color="primary">
        더보기
      </Button> */}
    </section>
  );
}

export default function Home() {
  const { dataList: notices, fetchDataList } = useAPIData<
    typeof API_URLS.notices.method.get
  >(API_URLS.notices);

  useEffect(() => {
    fetchDataList(1, 2); // TODO: limit?
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles["top-section"]}>
        {/* <h1 className={styles.greeting}>성문워터젯에서 함께합니다</h1> */}
        <div className={styles["left-container"]}>
          <h2 className={styles.greeting}>
            초고압 워터젯 공법으로
            <br />
            <em>혁신적인 공사</em>를 제공합니다
          </h2>
          <Link href="/business/waterjet">
            <div className={styles["waterjet-more-button"]}>
              <span className={styles.icon}>
                <RiArrowRightUpLine color="#ffffff" size={20} />
              </span>
              워터젯
              <br />
              알아보기
            </div>
          </Link>
        </div>
        <Image
          src={landingPageImage}
          className={styles.photo}
          alt={"성문워터젯 공사현장 사진"}
          width={800}
          height={400}
        />
      </section>

      <div className={styles["full-width"]}>
        <ul className={styles["list-container"]}>
          <li>
            {/* 서비스 소개 섹션 */}
            <ListItem
              title="SERVICE"
              content={
                <ul className={styles.content}>
                  <li>철근에 손상없이 콘크리트 해체</li>
                  <li>도로 보수공사, 교량의 상판 보수공사</li>
                  <li>도로, 다리, 높은 주차 건물의 콘크리트 파쇄</li>
                </ul>
              }
              link="/business/fields"
            />
          </li>

          {/* 워터젯 공법 설명 섹션 */}
          <li>
            <ListItem
              title="WATERJET"
              content={
                <p className={styles.content}>
                  초고압, 초고속으로 만들어진 제트류를 콘크리트 구조물에
                  분사하는 공법으로, 철근 손상 없이 구조물의 세굴을 통해
                  콘크리트 구조물의 보수 또는 보강이 가능합니다.
                </p>
              }
              link="/business/waterjet"
            />
          </li>

          {/* 실적 현황 섹션 */}
          <li>
            <ListItem
              title="PERFORMANCE"
              content={
                <p className={styles.content}>
                  최신 장비와 풍부한 노하우를 갖춘 우수 전문 인력으로 수행한
                  주요 프로젝트들입니다.
                </p>
              }
              link="/performance/reports"
            />
          </li>
        </ul>
      </div>
      {/* 공지사항 노출 */}
      {/* TODO: carousel로 구현 */}
      <section>
        <h1>현장 사진</h1>
        <article className={styles["carousel-container"]}>
          <ul className={styles.carousel}>
            <li>
              <img src="" alt="" className={styles.photo} />
            </li>
            <li>
              <img src="" alt="" className={styles.photo} />
            </li>
            <li>
              <img src="" alt="" className={styles.photo} />
            </li>
            <li>
              <img src="" alt="" className={styles.photo} />
            </li>
            <li>
              <img src="" alt="" className={styles.photo} />
            </li>
          </ul>
        </article>
      </section>

      <div className={styles["article-container"]}>
        <article className={styles.notice}>
          <div className={styles["title-button-container"]}>
            <h1 className={styles.title}>Notice</h1>

            <Link
              href={"/support/notice"}
              className={styles["notice-navigate-link"]}
            >
              <RiArrowRightUpLine color="#3272eb" size={20} />
            </Link>
          </div>
          <ol>
            {notices.map((notice) => (
              <li key={notice.id} className={styles["link-item"]}>
                <Link href={`/support/notice/${notice.id}`}>
                  <p className={styles["notice-title"]}>{notice.title}</p>
                  <p className={styles["notice-created-at"]}>
                    {formatDate(notice.created_at)}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </article>
        {/* <article className={styles.notice}>
          <div className={styles["title-button-container"]}>
            <h1></h1>
            <Button color="primary" href={"/support/notice"}>
              바로가기
            </Button>
          </div>
          <ol className={styles.notice}>
            {notices.map((notice) => (
              <li key={notice.id}>
                <Button
                  color="transparent-link"
                  href={`/support/notice/${notice.id}`}
                >
                  {notice.title}
                </Button>
              </li>
            ))}
          </ol>
        </article> */}
        <article className={styles.inquiry}>
          <h1 className={styles["sr-only"]}>문의하기</h1>
          <p className={styles.title}>Contact us</p>
          <ul className={styles.numbers}>
            <li>033-261-4175</li>
            <li>010-4277-6693</li>
          </ul>
          <div className={styles.divider} />
          <p className={styles.description}>
            상담시간 오전 9시 ~ 오후 6시
            <br />
            토, 일요일, 공휴일은 휴무입니다.
          </p>
          <Link
            href="/support/inquiry/edit"
            className={styles["inquiry-button"]}
          >
            문의글 작성하기
            <RiArrowRightUpLine color="#ffffff" size={24} />
          </Link>
        </article>
      </div>
      {/* 현장 사진 노출 */}
      {/* 문의하기  */}
    </div>
  );
}
