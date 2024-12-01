"use client";
import React, { useState } from "react";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";
import BoardEditLayout from "../_layout/edit/layout";

export default function Edit() {
  const OVERVEIW_API = API_URLS.overview;

  const [overviewContents, setOverviewContents] = useState<
    typeof OVERVEIW_API.method.post
  >({
    // 공사명, 공사년도, 시작일, 종료일, 비고(Null)
  });

  const { handleChange, handleSubmit, isFormDirty } = useFormData<
    typeof OVERVEIW_API.method.get,
    typeof OVERVEIW_API.method.post
  >(OVERVEIW_API, overviewContents, setOverviewContents);

  return (
    <BoardEditLayout
    //   contents={overviewContents}
    //   handleChange={handleChange}
    //   handleSubmit={handleSubmit}
    //   isFormDirty={isFormDirty}
    />
  );
}
