import { useEffect, useState } from "react";
import axiosInstance from "../_config/axiosInstance";
import { getAuthHeaders } from "../_utils/getToken";
import { APIConfig } from "../_config/apiConfig";

export const useAPIData = <T>(apiConfig: APIConfig<T>, page?: number) => {
  const [dataList, setDataList] = useState<T[]>([]);
  const [dataDetail, setDataDetail] = useState<T | undefined>(undefined);

  const fetchDataList = async (page: number) => {
    console.log(apiConfig.url);
    try {
      const response = await axiosInstance.get(`${apiConfig.url}?page=${page}`);
      setDataList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("fetchDataList 에러", error);
    }
  };

  useEffect(() => {
    fetchDataList(page ?? 1);
  }, [page]);

  const fetchData = async (id: string, password?: string) => {
    // password O: 문의사항
    // password X: 공지사항
    // console.log(password);
    // const password = "1234";
    try {
      const response = await axiosInstance({
        method: password ? "post" : "get",
        url: `${apiConfig.url}/${id}`,
        data: password ? { password } : undefined,
      });
      console.log(response);
      setDataDetail(response.data);
    } catch (error) {
      console.error(`fetData 에러, ${error}`);
    }
  };

  const postData = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post(
        apiConfig.url,
        formData,
        getAuthHeaders()
      );
      console.log("response", response);
    } catch (error) {
      console.error("postData 에러", error);
    }
  };

  return { dataList, dataDetail, postData, fetchData };
};
