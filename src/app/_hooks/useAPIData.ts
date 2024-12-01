import { useEffect, useState } from "react";
import axiosInstance from "../_config/axiosInstance";
import { getAuthHeaders } from "../_utils/getAuth";
import { APIConfig } from "../_config/apiConfig";
import { AxiosError } from "axios";

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

  // 에러 메시지 반환
  // TODO: 에러 메시지 따로 관리하기
  const fetchData = async (
    id: string,
    password?: string
  ): Promise<string | null> => {
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
      return null;
    } catch (error) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response!.status === 401
      ) {
        console.error(`비밀번호가 불일치 에러, ${error}`);
        return "비밀번호가 올바르지 않습니다.";
        // 문의사항 비밀번호 불일치
      } else {
        console.error(`fetData 에러, ${error}`);
        return "알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.";
      }
    }
  };

  const postData = async (formData: FormData) => {
    try {
      formData.forEach((item) => console.log(item));

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
