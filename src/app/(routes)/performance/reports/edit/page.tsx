"use client";
import React, { useState } from "react";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import BoardEditLayout from "../_layout/edit/layout";

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

  const { handleChange, handleUpload } = useFormData<
    typeof REPORTS_API.method.get,
    typeof REPORTS_API.method.post
  >(REPORTS_API, reportsContents, setReportsContents);

  return (
    <BoardEditLayout
      contents={reportsContents}
      handleChange={handleChange}
      handleSubmit={handleUpload}
    />
  );
}
