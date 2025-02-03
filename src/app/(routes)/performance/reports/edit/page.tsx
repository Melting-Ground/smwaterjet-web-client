"use client";
import React, { useState } from "react";
import useFormData from "@/_hooks/useFormData";
import { API_URLS } from "@/_config/apiConfig";
import BoardEditLayout from "@/_layout/reports/edit/layout";
import useBoardAction from "@/_hooks/useBoardAction";

export default function Edit() {
  const REPORTS_API = API_URLS.reports;

  const [reportsContents, setReportsContents] = useState<
    typeof REPORTS_API.method.post
  >({
    title: "",
    start_date: "",
    end_date: "",
    year: "2024",
    note: null,
  });

  const { handleChange, uploadForm } = useFormData<
    typeof REPORTS_API.method.get,
    typeof REPORTS_API.method.post
  >(REPORTS_API, reportsContents, setReportsContents);

  const { goToListPage } = useBoardAction("performance", "reports");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await uploadForm(e);
      goToListPage();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <BoardEditLayout
      contents={reportsContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListClick={goToListPage}
    />
  );
}
