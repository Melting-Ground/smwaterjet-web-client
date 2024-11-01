"use client";
import React from "react";
import { NoticeProvider } from "../../../_contexts/noticeContext";

export default function NoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NoticeProvider>{children}</NoticeProvider>;
}
