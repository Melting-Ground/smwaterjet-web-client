"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URLS } from "@/_config/apiConfig";
import { useAPIData } from "@/_hooks/useAPIData";
import useFormData from "@/_hooks/useFormData";
import GalleryEditLayout from "@/_layout/gallery/edit/layout";
import { FileWithIdType } from "@/_types/file";

export default function Edit() {
  const PHOTO_API = API_URLS.photos;
  const { id } = useParams();
  const router = useRouter();
  const currentId = typeof id === "string" ? id : undefined;

  const { fetchData, dataDetail, isLoading } = useAPIData<
    typeof API_URLS.photos.method.get
  >(API_URLS.photos);

  const [photoContents, setPhotoContents] = useState<
    typeof PHOTO_API.method.put
  >({
    title: "",
    files: [],
    newFiles: [],
  });
  const [existingFiles, setExistingFiles] = useState<FileWithIdType[]>([]);
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

  useEffect(() => {
    if (currentId) {
      fetchData(currentId);
    }
  }, [currentId]);

  useEffect(() => {
    if (dataDetail) {
      const mappedFiles =
        dataDetail.files?.map((file) => ({
          id: file.id,
          file_path: file.file_path,
        })) || [];
      setPhotoContents({
        title: dataDetail.title || "",
        files: mappedFiles,
        newFiles: [],
      });
      setExistingFiles(mappedFiles);
    }
  }, [dataDetail]);

  const { handleChange, updateForm } = useFormData<
    typeof PHOTO_API.method.get,
    typeof PHOTO_API.method.put
  >(PHOTO_API, photoContents, setPhotoContents);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentId) {
      alert("?ъ쭊 ?뺣낫瑜?李얠쓣 ???놁뒿?덈떎.");
      return;
    }
    try {
      await updateForm(e, currentId, deleteFileIds);
      router.push(`/business/photos/${currentId}`);
    } catch (error) {
      alert(error);
    }
  };

  const handleFileDelete = (id: string) => {
    setExistingFiles((prev) =>
      prev.filter((file) => file.id.toString() !== id)
    );
    setDeleteFileIds((prev) => [...prev, Number(id)]);
  };

  if (!currentId) {
    return <div>?대떦 ?ъ쭊 ?뺣낫瑜?李얠쓣 ???놁뒿?덈떎.</div>;
  }

  const isNotLoaded = isLoading.detail || !dataDetail;

  return !isNotLoaded ? (
    <GalleryEditLayout
      method="update"
      contents={photoContents}
      existFiles={existingFiles}
      handleFileDelete={handleFileDelete}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleListClick={() => router.push("/business/photos")}
    />
  ) : (
    <div>濡쒕뵫以?..</div>
  );
}
