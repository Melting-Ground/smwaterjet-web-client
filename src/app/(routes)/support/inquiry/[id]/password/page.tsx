"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import Input from "@/_components/Input/Input";
import Button from "@/_components/Button/Button";
import { usePathname, useRouter } from "next/navigation";
import { UserInquiryPasswordContext } from "@/_contexts/inquiryContext";
import useBoardAction from "@/_hooks/useBoardAction";

export default function Password() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[3];
  const { password, setPassword } = UserInquiryPasswordContext();

  useEffect(() => {
    setPassword("");
  }, [id]);

  const onPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/support/inquiry/${id}`);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const { goToListPage } = useBoardAction("support", "inquiry");

  return (
    <section className={styles.container}>
      <div className={styles["form-container"]}>
        <h3>문의사항 비밀글</h3>
        <form onSubmit={onPasswordSubmit} className={styles.form}>
          <p className={styles.description}>비밀글 기능으로 보호된 글입니다.</p>
          <p className={styles["description-sub"]}>
            작성자와 관리자만 열람할 수 있습니다. 본인이라면 비밀번호를 입력해
            주세요.
          </p>
          <fieldset className={styles["fieldset-container"]}>
            <legend className={styles["form-title"]}>
              비밀글 비밀번호 입력
            </legend>
            <div className={styles["input-container"]}>
              <label htmlFor="password">비밀번호</label>
              <Input
                type="password"
                id="password"
                onChange={onPasswordChange}
                value={password}
                fullWidth
                className={styles.input}
              />
              <Button
                ariaLabel="확인"
                color="primary"
                type="submit"
                className={styles.button}
              >
                확인
              </Button>
            </div>
          </fieldset>
        </form>
        <Button
          color="transparent-link"
          onClick={goToListPage}
          fullWidth
          className={styles["go-back-button"]}
          ariaLabel="목록으로 돌아가기"
        >
          목록으로 돌아가기
        </Button>
      </div>
    </section>
  );
}
