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
      sessionStorage.setItem("loginReturnTo", window.location.pathname + window.location.search);
      router.replace("/login");
    }
  }, [isInitialized, isLoggedIn, router]);

  if (!isInitialized || !isLoggedIn) return null;
  return <>{children}</>;
}
