"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { AuthProvider } from "./_contexts/authContext";
import { useAuth } from "./_hooks/useAuth";
import { useRouter } from "next/navigation";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;

  return (
    <AuthProvider>
      {children}
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
    </AuthProvider>
  );
};

export default ClientWrapper;
