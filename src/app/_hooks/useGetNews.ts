import { useEffect, useState } from "react";
import { NewsType } from "../_types/news";
import axios from "axios";

// TODO: 로딩 상태 추가하기
export const useGetNews = (searchQuery: string) => {
  const [newsList, setNewsList] = useState<NewsType[] | NewsType | null>();
  const fetchNews = async (searchQuery: string) => {
    try {
      const { data } = await axios.get(
        `/api/naver/v1/search/news.json?query=${searchQuery}&display=10&start=1&sort=sim`,
        {
          headers: {
            "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
            "X-Naver-Client-Secret":
              process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!,
          },
        }
      );
      console.log(data);
      setNewsList(data.items);
      // const xmlText = await response.text();
      // console.log(xmlText);
      // const parser = new xml2js.Parser({
      //   explicitArray: false,
      //   mergeAttrs: true,
      // });
      // const parsedJson = await parser.parseStringPromise(xmlText);
      // setNewsList(parsedJson.rss.channel.item);
    } catch (error) {
      console.error("fetchNews 에러", error);
    }
  };
  useEffect(() => {
    fetchNews(searchQuery);
  }, []);

  return { newsList };
};
