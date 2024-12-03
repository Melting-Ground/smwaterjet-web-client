"use client";
import React from "react";
import { useAPIData } from "../../../_hooks/useAPIData";
import { API_URLS } from "../../../_config/apiConfig";
import { useRouter } from "next/navigation";
import useFormData from "../../../_hooks/useFormData";
import BoardListLayout from "../../../_layout/reports/list/layout";

export default function Reports() {
  // 게시판
  // TODO: 페이지네이션
  const router = useRouter();
  const REPORTS_API = API_URLS.reports;

  const { dataList: reports } = useAPIData<typeof API_URLS.reports.method.get>(
    REPORTS_API,
    1
  );

  const { handleDelete } = useFormData(REPORTS_API);

  const reportsTableHeadList = [
    "No",
    "공사년도",
    "공사명",
    "시작일",
    "종료일",
    "비고",
  ];
  // const goToEditPage = () => {
  //   router.push(`/support/${type}/edit`);
  // };
  return (
    <BoardListLayout
      handleDelete={handleDelete}
      // handleUpdate={goToEditPage}
      tableHeadList={reportsTableHeadList}
      list={reports}
      colWidthList={[50, 50, 250, 80, 80, 50]}
    />
  );
}
