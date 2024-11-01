// 공지사항 게시판 목록 컨텍스트
import { createContext, useContext, useState } from "react";
import { NoticeType } from "../_types/notice";

interface NoticeContextType {
  noticeList: NoticeType[];
  setNoticeList: React.Dispatch<React.SetStateAction<NoticeType[]>>;
}

export const NoticeContext = createContext<NoticeContextType | undefined>(
  undefined
);

export const NoticeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [noticeList, setNoticeList] = useState<NoticeType[]>([]);

  return (
    <NoticeContext.Provider value={{ noticeList, setNoticeList }}>
      {children}
    </NoticeContext.Provider>
  );
};

export const useNoticeContext = () => {
  const context = useContext(NoticeContext);

  if (!context) {
    throw new Error(
      "useNoticeContext는 NoticeProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
