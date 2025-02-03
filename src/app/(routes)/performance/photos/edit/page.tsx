"use client";
import { API_URLS } from "@/_config/apiConfig";
import useFormData from "@/_hooks/useFormData";
import GalleryEditLayout from "@/_layout/gallery/edit/layout";
import React, { useState } from "react";
import useBoardAction from "@/_hooks/useBoardAction";

export default function Edit() {
  const PHOTO_API = API_URLS.photos;

  const [photoContents, setPhotoContents] = useState<
    typeof PHOTO_API.method.post
  >({
    title: "",
    content: "",
    year: -1,
    path: "",
  });

  const { handleChange, uploadForm } = useFormData<
    typeof PHOTO_API.method.get,
    typeof PHOTO_API.method.post
  >(PHOTO_API, photoContents, setPhotoContents);

  const { goToListPage, goToDetailPage } = useBoardAction(
    "performance",
    "photos"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const id = await uploadForm(e);
      if (!id) {
        return;
      }
      goToDetailPage(id);
      // 이동
    } catch (error) {
      alert(error);
    }
  };

  return (
    <GalleryEditLayout
      method="upload"
      contents={photoContents}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListClick={goToListPage}
    />
  );
}
