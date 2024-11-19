"use client";
import React, { useEffect } from "react";
import { useAuth } from "./_hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("관리자만 접근 가능한 페이지입니다.");
      router.back();
    }
  }, []);

  return <>{children}</>;
}
