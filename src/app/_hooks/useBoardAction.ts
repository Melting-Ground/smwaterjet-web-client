import { BoardType } from "@/_types/board";
import { useRouter } from "next/navigation";

const useBoardAction = () => {
  const router = useRouter();

  // [글쓰기] 버튼 클릭 -> 작성/수정 페이지로 이동
  // pageCategory: support, board: notice/
  const goToEditPage = (
    pageCategory: "support" | "performance",
    boardCategory: BoardType | "reports"
  ) => {
    router.push(`/${pageCategory}/${boardCategory}/edit`);
  };
  return { goToEditPage };
};

export default useBoardAction;
