"use client";
import React from "react";
import { InquiryPasswordProvider } from "@/_contexts/inquiryContext";

export default function InquiryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InquiryPasswordProvider>{children}</InquiryPasswordProvider>;
}
