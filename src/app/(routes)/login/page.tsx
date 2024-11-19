"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import Button from "../../_components/Button/Button";
import Input from "../../_components/Input/Input";
import { useLogin } from "../../_hooks/useLogin";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";

export default function Login() {
  const { handleChange, handleSubmit, handleCheckboxChange, rememberMe } =
    useLogin();

  // const postRequest = async () => {
  //   try {
  //     // console.log("submit", localStorage.getItem("token"));
  //     const token = localStorage.getItem("token");
  //     const response = await axiosInstance.post("/company/certificates", {
  //       path: "1234",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     // localStorage.setItem("token", data);
  //     console.log("응답:", response);
  //   } catch (e) {
  //     console.error("에러:", e);
  //   }
  // };

  // const getRequest = async () => {
  //   try {
  //     // console.log("submit", localStorage.getItem("token"));
  //     // const token = localStorage.getItem("token");
  //     const response = await axiosInstance.get("/company/certificates");
  //     // localStorage.setItem("token", data);
  //     console.log("응답:", response);
  //   } catch (e) {
  //     console.error("에러:", e);
  //   }
  // };

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <section className={styles.container}>
      <h3>로그인</h3>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>로그인</legend>
          <label htmlFor="id" className={styles["id-label"]}>
            아이디
          </label>
          <Input
            placeholder="아이디"
            id="id"
            className={styles.id}
            onChange={handleChange}
            fullWidth
          />
          <label htmlFor="password" className={styles["password-label"]}>
            비밀번호
          </label>
          <Input
            placeholder="비밀번호"
            id="password"
            className={styles.password}
            onChange={handleChange}
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
          <span className={styles["remember-me-container"]}>
            <Input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="remember-me"
              className={styles["remember-me-label"]}
            >
              로그인 상태 유지
            </label>
          </span>
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
