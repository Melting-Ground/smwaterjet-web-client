"use client";

import React from "react";
import { AuthProvider } from "./_contexts/authContext";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ClientWrapper;
