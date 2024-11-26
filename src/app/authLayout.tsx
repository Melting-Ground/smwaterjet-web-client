"use client";
import React, { useEffect } from "react";
import { useAuth } from "./_hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./_contexts/authContext";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { isInitialized } = useAuthContext();

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      alert("관리자만 접근 가능한 페이지입니다.");
      router.back();
    }
  }, [isInitialized, isLoggedIn]);

  return <>{children}</>;
}
