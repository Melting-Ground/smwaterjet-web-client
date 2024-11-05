import { useEffect, useState } from "react";
import axiosInstance from "../_config/axiosInstance";
import { getAuthHeaders } from "../_utils/getToken";
import { APIConfig } from "../_config/apiConfig";

export const useAPIData = <T>(apiConfig: APIConfig<T>) => {
  const [dataList, setDataList] = useState<T[]>([]);
  const [dataDetail, setDataDetail] = useState<T | undefined>(undefined);

  const fetchDataList = async () => {
    try {
      const response = await axiosInstance.get(apiConfig.url);
      setDataList(response.data);
    } catch (error) {
      console.error("fetchDataList 에러", error);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const fetchData = async (id: string) => {
    try {
      const response = await axiosInstance.get(`${apiConfig.url}/${id}`);
      setDataDetail(response.data);
    } catch (error) {
      console.error("fetData 에러, error");
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
