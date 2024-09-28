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
      const response = await axios.get("/company/certificates");
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.login}>
      <label htmlFor="id">
        아이디 <input id="id" className={styles.id} onChange={onChange} />
      </label>
      <label htmlFor="password">
        비밀번호{" "}
        <input id="password" className={styles.password} onChange={onChange} />
      </label>
      <button onClick={onSubmit}>로그인</button>
    </div>
  );
}
