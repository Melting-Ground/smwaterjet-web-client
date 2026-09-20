"use client";
import React from "react";
import { useGetNews } from "@/_hooks/useGetNews";
import { removeHtmlTags } from "@/_utils/removeHtmlTags";
import styles from "./page.module.scss";
import { NewsType } from "@/_types/news";
import { newsFormatDate } from "@/_utils/formatDate";
import Link from "next/link";
import AsyncState from "@/_components/AsyncState/AsyncState";

// 뉴스가 들어있는 url_name
const newspaperCompany = [{ name: "공학저널", url_name: "engjournal" }];

export default function News() {
  // https://www.woowahan.com/newsroom/media?page=1&offset=true

  const getNewspaperName = (originallink: string) => {
    const matchingCompany = newspaperCompany.find((company) =>
      originallink.includes(company.url_name)
    );
    return matchingCompany ? matchingCompany.name : null;
  };

  const renderNewsItem = (news: NewsType, index: number) => {
    const newspaperName = getNewspaperName(news.originallink);
    return (
      <li key={index}>
        <Link href={news.originallink} passHref legacyBehavior>
          <a target="_blank">
            <article key={index} className={styles.article}>
              <h3 className={styles.title}>{removeHtmlTags(news.title)}</h3>
              <p className={styles.content}>
                {removeHtmlTags(news.description)}
              </p>
              <span className={styles.description}>
                {newspaperName && (
                  <p className={styles.company}>{newspaperName}</p>
                )}
                <p className={styles["pub-date"]}>
                  {newsFormatDate(news.pubDate)}
                </p>
              </span>
            </article>
          </a>
        </Link>
      </li>
    );
  };

  const { newsList, isLoading, error, retry } = useGetNews(
    "성문워터젯 삼형건설"
  );

  if (isLoading) {
    return <AsyncState status="loading" message="관련 뉴스를 불러오는 중입니다." />;
  }

  if (error) {
    return (
      <AsyncState
        status="error"
        message="관련 뉴스를 불러오지 못했습니다."
        onRetry={retry}
      />
    );
  }

  if (!newsList || (Array.isArray(newsList) && newsList.length === 0)) {
    return <AsyncState status="empty" message="등록된 관련 뉴스가 없습니다." />;
  }

  return (
    <section className={styles.container}>
      <ol className={styles.news}>
        {Array.isArray(newsList) ? (
          newsList.map((news, index) => renderNewsItem(news, index))
        ) : newsList && typeof newsList === "object" ? (
          renderNewsItem(newsList, 0) // 뉴스 1개
        ) : null}
      </ol>
    </section>
  );
}
