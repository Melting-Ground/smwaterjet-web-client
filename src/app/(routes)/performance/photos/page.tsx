"use client";
import React from "react";
import GalleryLayout, { GalleryItemType } from "@/_layout/gallery/layout";

export default function Photos() {
  const imageList: GalleryItemType[] = [
    {
      image: "/images/waterjet.jpg",
      id: 1,
      title: "gkgk",
    },
    {
      image: "/images/waterjet.jpg",
      id: 1,
      title: "gkgk",
    },
    {
      image: "/images/waterjet.jpg",
      id: 1,
      title: "gkgk",
    },
    {
      image: "/images/waterjet.jpg",
      id: 1,
      title: "gkgk",
    },
    {
      image: "/images/waterjet.jpg",
      id: 1,
      title: "gkgk",
    },
  ];

  return <GalleryLayout list={imageList} />;
}
