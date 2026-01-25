import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const usePagination = (lastPageNumber: number) => {
  // 최대 페이지 크기
  const MAX_PAGE_LENGTH = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = Array.from({ length: lastPageNumber }, (_, index) => index + 1);

  // 초기화. 처음 렌더링에만 실행
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const parsedPage = pageParam ? Number(pageParam) : NaN;
    if (Number.isFinite(parsedPage) && parsedPage > 0) {
      setCurrentPage(parsedPage);
    }
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (isFirstRender) return;

    const params = new URLSearchParams(window.location.search);
    params.set("page", String(currentPage));
    router.push(`?${params.toString()}`);
  }, [currentPage]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const parsedPage = pageParam ? Number(pageParam) : NaN;
    if (Number.isFinite(parsedPage) && parsedPage > 0) {
      if (parsedPage !== currentPage) {
        setCurrentPage(parsedPage);
      }
    }
  }, [searchParams]);

  const clickPageButton = (page: number) => {
    // ?page=1 쿼리 파라미터 전달
    setCurrentPage(page);
  };
  const clickArrowButton = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentPage <= 1) {
        return;
      }
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      if (currentPage >= lastPageNumber) {
        return;
      }
      setCurrentPage((prev) => prev + 1);
    }
  };

  return {
    pages,
    currentPage,
    clickPageButton,
    clickArrowButton,
    setCurrentPage,
  };
};
export default usePagination;
