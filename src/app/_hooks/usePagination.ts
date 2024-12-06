import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const usePagination = (lastPageNumber: number) => {
  // 최대 페이지 크기
  const MAX_PAGE_LENGTH = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  useEffect(() => {
    const savedPage = sessionStorage.getItem("page");
    if (savedPage) {
      setCurrentPage(Number(savedPage)); 
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("page", String(currentPage));
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(currentPage));
    router.push(`?${params.toString()}`);
  }, [currentPage]);

  const clickPageButton = (page: number) => {
    // ?page=1 쿼리 파라미터 전달
    setCurrentPage(page);
  };
  const clickPreviousButton = () => {
    // 1 min
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };
  const clickNextButton = () => {
    // 10 max
    if (currentPage >= lastPageNumber) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };
  return { currentPage, clickPageButton, clickPreviousButton, clickNextButton };
};
export default usePagination;
