import React from "react";
import AuthLayout from "@/authLayout";

export default function ReportsEditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
