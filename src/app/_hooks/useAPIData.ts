import { useState } from "react";
import axiosInstance from "@/_config/axiosInstance";
import { getAuthHeaders } from "@/_utils/getAuth";
import { APIConfig } from "@/_config/apiConfig";
import { AxiosError } from "axios";
import { PaginationInfoType } from "@/_types/pagination";

export const useAPIData = <T>(apiConfig: APIConfig<T>) => {
  const [dataList, setDataList] = useState<T[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfoType>();
  const [dataDetail, setDataDetail] = useState<T | undefined>(undefined);

  const [isLoading, setIsLoading] = useState({
    list: false,
    detail: false,
    post: false,
    put: false,
    delete: false,
    deleteFile: false,
  });

  const fetchDataList = async (page: number, limit: number = 10) => {
    setIsLoading((prev) => ({ ...prev, list: true }));

    console.log(page, limit);
    try {
      const { data } = await axiosInstance.get(
        `${apiConfig.url}?page=${page}&limit=${limit}`
      );
      console.log(data);
      setDataList(data.items);
      setPaginationInfo(data.pagination);
      // setTotalPageLength(data);
    } catch (error) {
      throw new Error(`fatchDataList 에러: ${error}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, list: false }));
    }
  };

  // 에러 메시지 반환
  // TODO: 에러 메시지 따로 관리하기
  const fetchData = async (
    id: string,
    password?: string
  ): Promise<string | null> => {
    // password O: 문의사항
    // password X: 공지사항

    setIsLoading((prev) => ({ ...prev, detail: true }));
    try {
      const { data } = await axiosInstance.get(`${apiConfig.url}/${id}`, {
        ...getAuthHeaders(password ? password : undefined),
      });

      setDataDetail(data);
      return null;
    } catch (error) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response!.status === 401
      ) {
        console.error(`비밀번호가 불일치 에러, ${error}`);
        return "비밀번호가 올바르지 않습니다.";
      } else {
        console.error(`fetData 에러, ${error}`);
        return "알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.";
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, detail: false }));
    }
  };

  const yearSearchDataList = async (year: number | undefined) => {
    setIsLoading((prev) => ({ ...prev, list: true }));
    try {
      const { data } = await axiosInstance.get(`${apiConfig.url}/year/${year}`);

      console.log(data);
      setDataList(data.items);
      // setPaginationInfo(data.pagination);
      // setTotalPageLength(data);
    } catch (error) {
      throw new Error(`searchDataList 에러: ${error}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, list: false }));
    }
  };

  const postData = async (formData: FormData): Promise<{ id: string }> => {
    setIsLoading((prev) => ({ ...prev, post: true }));

    try {
      formData.forEach((item) => console.log(item, typeof item));

      const response = await axiosInstance.post(
        apiConfig.url,
        formData,
        getAuthHeaders()
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error(`postData 에러: ${error}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, post: false }));
    }
  };

  const putData = async (formData: FormData, id: string, password?: string) => {
    setIsLoading((prev) => ({ ...prev, put: true }));
    if (password) {
      formData.delete("password");
    }

    try {
      const response = await axiosInstance.put(
        `${apiConfig.url}/${id}`,
        formData,
        getAuthHeaders(password)
      );
      console.log("put data", response);
    } catch (error) {
      throw new Error(`putData 에러: ${error}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, put: false }));
    }
  };

  const deleteData = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, delete: true }));

    try {
      const response = await axiosInstance.delete(
        `${apiConfig.url}/${id}`,
        getAuthHeaders()
      );
      console.log(response);
    } catch (error) {
      throw new Error(`deleteData 에러: ${error}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const deleteFile = async (id: string) => {
    setIsLoading((prev) => ({ ...prev, deleteFile: true }));

    try {
      const response = await axiosInstance.delete(
        `${apiConfig.url}/file/${id}`,
        getAuthHeaders()
      );
      console.log(response);
    } catch (error) {
      throw new Error(`deleteFile 에러: ${error}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, deleteFile: false }));
    }
  };

  return {
    dataList,
    setDataList,
    fetchDataList,
    yearSearchDataList,
    paginationInfo,
    dataDetail,
    postData,
    putData,
    deleteData,
    deleteFile,
    fetchData,
    isLoading,
  };
};
