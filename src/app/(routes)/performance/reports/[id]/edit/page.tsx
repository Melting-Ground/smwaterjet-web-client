"use client";
import React, { useEffect, useState } from "react";
import useFormData from "@/_hooks/useFormData";
import { API_URLS } from "@/_config/apiConfig";
import { useParams, useRouter } from "next/navigation";
import { useAPIData } from "@/_hooks/useAPIData";
import BoardEditLayout from "@/_layout/reports/edit/layout";
import useBoardAction from "@/_hooks/useBoardAction";

export default function Edit() {
  const REPORTS_API = API_URLS.reports;
  const { id } = useParams();
  let currentId;
  if (typeof id === "string") {
    currentId = id;
  }
  if (!currentId) {
    return <div>존재하지 않는 게시물입니다.</div>;
  }

  const {
    fetchData: fetchReportDetail,
    dataDetail: reportDetail,
    isLoading,
  } = useAPIData<typeof API_URLS.reports.method.get>(API_URLS.reports);

  const [reportContents, setReportContents] = useState<
    typeof REPORTS_API.method.put
  >({
    title: "",
    start_date: "",
    end_date: "",
    year: "",
    note: null,
  });

  useEffect(() => {
    if (currentId) {
      console.log("fetch");
      fetchReportDetail(currentId);
    }
  }, [currentId]);

  useEffect(() => {
    if (reportDetail) {
      console.log("reportDetail", reportDetail);
      setReportContents({
        title: reportDetail?.title || "",
        start_date: reportDetail?.start_date || "",
        end_date: reportDetail?.end_date || "",
        year: reportDetail?.year || "",
        note: reportDetail?.note || "",
      });
    }
  }, [reportDetail]);

  const { handleChange, updateForm } = useFormData<
    typeof REPORTS_API.method.get,
    typeof REPORTS_API.method.put
  >(REPORTS_API, reportContents, setReportContents);

  const { goToListPage } = useBoardAction("performance", "reports");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await updateForm(e, currentId);
      goToListPage();
    } catch (error) {
      alert(error);
    }
  };

  const isNotLoaded = isLoading.detail || !reportContents;

  return !isNotLoaded ? (
    <BoardEditLayout
      contents={reportContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListClick={goToListPage}
    />
  ) : (
    <div>로딩중</div>
  );
}
