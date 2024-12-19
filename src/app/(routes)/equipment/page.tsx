"use client";
import React from "react";
import { EquipmentType } from "@/_types/equipment";
import { useLocalData } from "@/_hooks/useLocalData";
import GalleryLayout, { GalleryItemType } from "@/_layout/gallery/layout";

export default function Equipment() {
  // 영상
  const { data: equipments } = useLocalData<EquipmentType[]>("equipments");

  const galleryList: GalleryItemType[] = equipments
    ? equipments.map((equipment) => ({
        id: equipment.id,
        image: equipment.image,
        title: equipment.name,
        link: `/equipment/${equipment.id}`,
      }))
    : [];
  return <GalleryLayout list={galleryList} isLinkItem />;
}
