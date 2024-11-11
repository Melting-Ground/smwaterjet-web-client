// 문의사항 게시판 글 비밀번호
import { createContext, useContext, useState } from "react";

interface InquiryPasswordContextType {
  password: string | undefined;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const InquiryPasswordContext = createContext<
  InquiryPasswordContextType | undefined
>(undefined);

export const InquiryPasswordProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [password, setPassword] = useState<string>();

  return (
    <InquiryPasswordContext.Provider
      value={{
        password,
        setPassword,
      }}
    >
      {children}
    </InquiryPasswordContext.Provider>
  );
};

export const UserInquiryPasswordContext = () => {
  const context = useContext(InquiryPasswordContext);

  if (!context) {
    throw new Error(
      "useInquiryPasswordContext는 InquiryPasswordProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
