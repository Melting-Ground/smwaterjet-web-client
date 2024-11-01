import { useEffect, useState } from "react";
import { NoticeType } from "../_types/notice";
import axiosInstance from "../_config/axiosInstance";

const useNotices = () => {
  const [notices, setNotices] = useState<NoticeType[]>([]);

  const fetchNotices = async () => {
    try {
      const response = await axiosInstance.get("/support/notices");
      console.log("notices", response.data);
      setNotices(response.data);
    } catch (error) {
      console.error("에러", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return { notices, setNotices };
};
export default useNotices;
