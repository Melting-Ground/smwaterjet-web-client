"use client";
import React from "react";
import { EquipmentType } from "@/_types/equipment";
import { useLocalData } from "@/_hooks/useLocalData";
import GalleryLayout from "@/_layout/gallery/layout";
import { PhotoType } from "@/_types/photo";

export default function Equipment() {
  // 영상
  const { data: equipments } = useLocalData<EquipmentType[]>("equipments");

  const galleryList: PhotoType[] = equipments
    ? equipments.map((equipment) => ({
        id: equipment.id,
        path: equipment.image,
        title: equipment.name,
        // path: `/equipment/${equipment.id}`,
      }))
    : [];
  return <GalleryLayout list={galleryList} isLinkItem />;
}
