import AuthLayout from "@/authLayout";
import type { ReactNode } from "react";

export default function EditLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
