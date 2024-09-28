"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import axios from "axios";

export default function Login() {
  const [value, setValue] = useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setValue({
    //    [e.target.id]: e.target.value;
    // });
    if (e.target.id === "id") {
      setValue({ ...value, id: e.target.value });
    } else {
      setValue({ ...value, password: e.target.value });
    }
  };

  // test get request
  const onSubmit = async () => {
    console.log(value);
    try {
      console.log("submit");
      const { data } = await axios.post(
        "http://ec2-52-78-107-218.ap-northeast-2.compute.amazonaws.com:3000/admins/login",
        {
          phoneNumber: value.id,
          password: value.password,
        }
      );
      localStorage.setItem("token", data);
      console.log("응답:", data);
    } catch (e) {
      console.error("에러:", e);
    }
  };

  const postRequest = async () => {
    try {
      // console.log("submit", localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://ec2-52-78-107-218.ap-northeast-2.compute.amazonaws.com:3000/company/certificates",
        {
          path: "1234",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // localStorage.setItem("token", data);
      console.log("응답:", response);
    } catch (e) {
      console.error("에러:", e);
    }
  };

  const getRequest = async () => {
    try {
      // console.log("submit", localStorage.getItem("token"));
      // const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://ec2-52-78-107-218.ap-northeast-2.compute.amazonaws.com:3000/company/certificates"
      );
      // localStorage.setItem("token", data);
      console.log("응답:", response);
    } catch (e) {
      console.error("에러:", e);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="id">
        아이디
        <input id="id" className={styles.id} onChange={onChange} />
      </label>
      <label htmlFor="password">
        비밀번호
        <input id="password" className={styles.password} onChange={onChange} />
      </label>
      <button onClick={onSubmit}>로그인</button>
      <button onClick={postRequest}>post요청</button>
      <button onClick={getRequest}>get요청</button>
    </div>
  );
}
