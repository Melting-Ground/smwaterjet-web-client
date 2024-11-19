import { useState } from "react";
import axiosInstance from "../_config/axiosInstance";

export const useLogin = () => {
  const [value, setValue] = useState<{
    id: string;
    password: string;
  }>({
    id: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "id") {
      setValue({ ...value, id: e.target.value });
    } else {
      setValue({ ...value, password: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/admins/login", {
        phoneNumber: value.id,
        password: value.password,
      });

      if (rememberMe) {
        localStorage.setItem("token", data);
      } else {
        sessionStorage.setItem("token", data);
      }
    } catch (e) {
      console.error("로그인 에러:", e);
    }
  };

  return { handleChange, handleSubmit, handleCheckboxChange, rememberMe };
};
