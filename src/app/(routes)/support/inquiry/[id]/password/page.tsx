"use client";
import React from "react";
import Input from "../../../../../_components/Input/Input";
import Button from "../../../../../_components/Button/Button";
import { usePathname, useRouter } from "next/navigation";
import { UserInquiryPasswordContext } from "../../../../../_contexts/inquiryContext";

export default function Password() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[3];
  const { password, setPassword } = UserInquiryPasswordContext();
  console.log(id);

  const onPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/support/inquiry/${id}`);
  };

  return (
    <div>
      <form onSubmit={onPasswordSubmit}>
        <label>
          비밀번호
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <Button color="primary" type="submit">
          확인
        </Button>
      </form>
    </div>
  );
}
