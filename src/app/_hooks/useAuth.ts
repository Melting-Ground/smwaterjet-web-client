import { useState } from "react";
import axiosInstance from "@/_config/axiosInstance";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/_contexts/authContext";

export const useAuth = () => {
  const { login, logout, isLoggedIn } = useAuthContext();

  const [value, setValue] = useState<{
    id: string;
    password: string;
  }>({
    id: "",
    password: "",
  });
  const router = useRouter();
  // const [rememberMe, setRememberMe] = useState<boolean>(false);

  // const handleLoginCheckboxChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRememberMe(e.target.checked);
  // };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "id") {
      setValue({ ...value, id: e.target.value });
    } else {
      setValue({ ...value, password: e.target.value });
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.id || !value.password) {
      alert("아이디 및 비밀번호를 입력해주세요.");
      return;
    }
    try {
      const { data } = await axiosInstance.post("/admins/login", {
        phoneNumber: value.id,
        password: value.password,
      });

      login(data);
      alert("로그인 되었습니다.");
      router.push("/");
    } catch (e) {
      console.error("로그인 에러:", e);
      alert("아이디 및 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleLogoutClick = () => {
    logout();
    alert("로그아웃 되었습니다.");
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return {
    handleLoginChange,
    handleLoginSubmit,
    // handleLoginCheckboxChange,
    // rememberMe,
    handleLogoutClick,
    handleLoginClick,
    isLoggedIn,
  };
};
