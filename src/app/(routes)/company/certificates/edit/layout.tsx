import React from "react";
import AuthLayout from "@/authLayout";

export default function CertificatesEditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
