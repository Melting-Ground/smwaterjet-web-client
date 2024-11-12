"use client";
import React from "react";
import { useGetNews } from "../../../_hooks/useGetNews";
import { removeHtmlTags } from "../../../_utils/removeHtmlTags";
import styles from "./page.module.scss";
import { NewsType } from "../../../_types/news";
import { newsFormatDate } from "../../../_utils/formatDate";
import Link from "next/link";

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

  const { newsList } = useGetNews("성문워터젯 삼형건설");
  return (
    <section className={styles.container}>
      <ol className={styles.news}>
        {Array.isArray(newsList) ? (
          newsList.map((news, index) => renderNewsItem(news, index))
        ) : newsList && typeof newsList === "object" ? (
          renderNewsItem(newsList, 0) // 뉴스 1개
        ) : (
          <p></p>
        )}
      </ol>
    </section>
  );
}
