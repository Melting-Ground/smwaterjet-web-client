"use client";
import React, { useState } from "react";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import BoardEditLayout from "../_layout/edit/layout";

export default function Edit() {
  const OVERVEIW_API = API_URLS.reports;

  const [reportsContents, setReportsContents] = useState<
    typeof OVERVEIW_API.method.post
  >({
    title: "",
    startDate: "",
    endDate: "",
    year: 2024,
    note: null,
  });

  const { handleChange, handleSubmit, isFormDirty } = useFormData<
    typeof OVERVEIW_API.method.get,
    typeof OVERVEIW_API.method.post
  >(OVERVEIW_API, reportsContents, setReportsContents);

  return (
    <BoardEditLayout
      contents={reportsContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      //   isFormDirty={isFormDirty}
    />
  );
}
