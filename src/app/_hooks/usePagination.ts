import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const usePagination = (lastPageNumber: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const hasMountedRef = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = Array.from({ length: lastPageNumber }, (_, index) => index + 1);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const parsedPage = pageParam ? Number(pageParam) : NaN;
    if (
      Number.isFinite(parsedPage) &&
      parsedPage > 0 &&
      parsedPage !== currentPage
    ) {
      setCurrentPage(parsedPage);
    }
    hasMountedRef.current = true;
  }, [searchParams, currentPage]);

  useEffect(() => {
    if (!hasMountedRef.current) return;

    const params = new URLSearchParams(searchParams.toString());
    const currentParam = params.get("page");
    if (currentParam === String(currentPage)) {
      return;
    }
    params.set("page", String(currentPage));
    router.push(`?${params.toString()}`);
  }, [currentPage, router, searchParams]);

  const clickPageButton = (page: number) => {
    // ?page=1 쿼리 파라미터 수정
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
