import { useEffect, useState } from "react";
import { NoticeType } from "../_types/notice";
import axiosInstance from "../_config/axiosInstance";
import { getAuthHeaders } from "../_utils/getToken";

const useNotice = () => {
  const [notices, setNotices] = useState<NoticeType[]>([]);

  const fetchNotices = async () => {
    try {
      const response = await axiosInstance.get("/support/notices");
      console.log("notices", response.data);
      setNotices(response.data);
    } catch (error) {
      console.error("fetchNotices 에러", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const postNotice = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post(
        "/support/notices",
        formData,
        getAuthHeaders()
      );
      console.log("response", response);
    } catch (error) {
      console.error("postNotice 에러", error);
    }
  };

  return { notices, setNotices, postNotice };
};
export default useNotice;
