"use client";
import React from "react";
import { useGetNews } from "../../../_hooks/useGetNews";
import { removeHtmlTags } from "../../../_utils/removeHtmlTags";

export default function News() {
  // https://www.woowahan.com/newsroom/media?page=1&offset=true

  const { newsList } = useGetNews("성문워터젯 삼형건설");

  return (
    <div>
      {Array.isArray(newsList) ? (
        newsList.map((news, index) => (
          <div key={index}>
            <h3>{removeHtmlTags(news.title)}</h3>
            <p>{removeHtmlTags(news.description)}</p>
          </div>
        ))
      ) : newsList && typeof newsList === "object" ? (
        <div>
          <h3>{removeHtmlTags(newsList.title)}</h3>
          <p>{removeHtmlTags(newsList.description)}</p>
        </div>
      ) : (
        <p>뉴스가 존재하지 않습니다.</p>
      )}
    </div>
  );
}
