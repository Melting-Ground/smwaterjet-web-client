import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../_utils/getAuth";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
  isInitialized: boolean; // 초기화 상태
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();
    console.log("token", token);
    setIsLoggedIn(!!token);
    setIsInitialized(true);
  }, []);

  const login = (token: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  if (!isInitialized) {
    return <div>로딩 중...</div>;
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext는 AuthProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
