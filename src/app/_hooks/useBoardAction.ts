import { BoardType } from "@/_types/board";
import { useRouter } from "next/navigation";

const useBoardAction = (
  pageCategory: "support" | "performance",
  boardCategory: BoardType | "reports"
) => {
  const router = useRouter();

  // [글쓰기] 버튼 클릭 -> 작성/수정 페이지로 이동
  // pageCategory: support, board: notice/
  const goToEditPage = (id?: string) => {
    let url = `/${pageCategory}/${boardCategory}/edit`;
    if (id) {
      url = `/${pageCategory}/${boardCategory}/${id}/edit`;
    }
    router.push(url);
  };

  const goToListPage = () => {
    router.push(`/${pageCategory}/${boardCategory}`);
  };

  const goToDetailPage = (id: string) => {
    router.push(`/${pageCategory}/${boardCategory}/${id}`);
  };

  return { goToEditPage, goToListPage, goToDetailPage };
};

export default useBoardAction;
