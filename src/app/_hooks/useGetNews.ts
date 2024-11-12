import { useEffect, useState } from "react";
import xml2js from "xml2js";
import { NewsType } from "../_types/news";

export const useGetNews = (searchQuery: string) => {
  const [newsList, setNewsList] = useState<NewsType[] | NewsType | null>();
  const fetchNews = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `/api/naver/v1/search/news.xml?query=${searchQuery}&display=10&start=1&sort=sim`,
        {
          headers: {
            "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
            "X-Naver-Client-Secret":
              process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
          },
        }
      );
      const xmlText = await response.text();
      const parser = new xml2js.Parser({
        explicitArray: false,
        mergeAttrs: true,
      });
      const parsedJson = await parser.parseStringPromise(xmlText);
      setNewsList(parsedJson.rss.channel.item);
    } catch (error) {
      console.error("fetchNews 에러", error);
    }
  };
  useEffect(() => {
    fetchNews(searchQuery);
  }, []);

  return { newsList };
};
