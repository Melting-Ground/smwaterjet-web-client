import { useRouter, useSearchParams } from "next/navigation";

const usePagination = (lastPageNumber: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = Array.from({ length: lastPageNumber }, (_, index) => index + 1);
  const pageParam = Number(searchParams.get("page"));
  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const navigateToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), Math.max(lastPageNumber, 1));
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.push(`?${params.toString()}`);
  };

  const clickPageButton = (page: number) => {
    navigateToPage(page);
  };
  const clickArrowButton = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentPage <= 1) return;
      navigateToPage(currentPage - 1);
    } else if (direction === "next") {
      if (currentPage >= lastPageNumber) return;
      navigateToPage(currentPage + 1);
    }
  };

  return {
    pages,
    currentPage,
    clickPageButton,
    clickArrowButton,
  };
};
export default usePagination;
