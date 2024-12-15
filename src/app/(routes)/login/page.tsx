"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Button from "@/_components/Button/Button";
import Input from "@/_components/Input/Input";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useAuth } from "@/_hooks/useAuth";

export default function Login() {
  const { handleLoginChange, handleLoginSubmit } = useAuth();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <section className={styles.container}>
      <h3>로그인</h3>
      <form onSubmit={handleLoginSubmit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>로그인</legend>
          <label htmlFor="id" className={styles["id-label"]}>
            아이디
          </label>
          <Input
            placeholder="아이디"
            id="id"
            className={styles.id}
            onChange={handleLoginChange}
            fullWidth
          />
          <label htmlFor="password" className={styles["password-label"]}>
            비밀번호
          </label>
          <Input
            placeholder="비밀번호"
            id="password"
            className={styles.password}
            onChange={handleLoginChange}
            fullWidth
            type={!isShowPassword ? "password" : "text"}
            icon={
              <Button
                className={styles["show-password"]}
                onClick={handleShowPasswordClick}
              >
                {!isShowPassword ? (
                  <RiEyeOffLine color="lightgray" size={20} />
                ) : (
                  <RiEyeLine color="lightgray" size={20} />
                )}
              </Button>
            }
            iconPosition="inner-right"
          ></Input>
          {/* <span className={styles["remember-me-container"]}>
            <Input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleLoginCheckboxChange}
            />
            <label
              htmlFor="remember-me"
              className={styles["remember-me-label"]}
            >
              로그인 상태 유지
            </label>
          </span> */}
          <Button
            type="submit"
            color="primary"
            fullWidth
            className={styles.login}
          >
            로그인
          </Button>
        </fieldset>
      </form>
    </section>
  );
}
