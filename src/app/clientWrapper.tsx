"use client";

import React, { Suspense } from "react";
import { AuthProvider } from "./_contexts/authContext";
import LoadingState from "./_components/LoadingState/LoadingState";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingState />}>{children}</Suspense>
    </AuthProvider>
  );
};

export default ClientWrapper;
