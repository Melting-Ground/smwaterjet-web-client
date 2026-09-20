import { useCallback, useEffect, useState } from "react";
import { NewsType } from "@/_types/news";
import axios from "axios";

// TODO: 로딩 상태 추가하기
export const useGetNews = (searchQuery: string) => {
  const [newsList, setNewsList] = useState<NewsType[] | NewsType | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchNews = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `/api/naver/v1/search/news.json?query=${query}&display=10&start=1&sort=sim`,
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
    } catch (error) {
      console.error("fetchNews 에러", error);
      setError(error instanceof Error ? error : new Error("뉴스 조회 실패"));
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchNews(searchQuery);
  }, [fetchNews, searchQuery]);

  return {
    newsList,
    isLoading,
    error,
    retry: () => fetchNews(searchQuery),
  };
};
