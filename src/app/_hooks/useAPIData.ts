import { useCallback, useState } from "react";
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

  const fetchDataList = useCallback(
    async (page: number, limit: number = 10) => {
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
        throw new Error(`fatchDataList ?먮윭: ${error}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, list: false }));
      }
    },
    [apiConfig.url]
  );

  // ?먮윭 硫붿떆吏 諛섑솚
  // TODO: ?먮윭 硫붿떆吏 ?곕줈 愿由ы븯湲?
  const fetchData = useCallback(
    async (id: string, password?: string): Promise<string | null> => {
      // password O: 臾몄쓽?ы빆
      // password X: 怨듭??ы빆

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
          console.error(`鍮꾨?踰덊샇媛 遺덉씪移??먮윭, ${error}`);
          return "鍮꾨?踰덊샇媛 ?щ컮瑜댁? ?딆뒿?덈떎.";
        } else {
          console.error(`fetData ?먮윭, ${error}`);
          return "?????녿뒗 ?ㅻ쪟媛 諛쒖깮?덉뒿?덈떎. 愿由ъ옄?먭쾶 臾몄쓽?섏꽭??";
        }
      } finally {
        setIsLoading((prev) => ({ ...prev, detail: false }));
      }
    },
    [apiConfig.url]
  );

  const yearSearchDataList = useCallback(
    async (year: number | undefined) => {
      setIsLoading((prev) => ({ ...prev, list: true }));
      try {
        const { data } = await axiosInstance.get(`${apiConfig.url}/year/${year}`);

        console.log(data);
        setDataList(data.items);
        // setPaginationInfo(data.pagination);
        // setTotalPageLength(data);
      } catch (error) {
        throw new Error(`searchDataList ?먮윭: ${error}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, list: false }));
      }
    },
    [apiConfig.url]
  );

  const postData = useCallback(
    async (formData: FormData): Promise<{ id: string }> => {
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
        throw new Error(`postData ?먮윭: ${error}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, post: false }));
      }
    },
    [apiConfig.url]
  );

  const putData = useCallback(
    async (formData: FormData, id: string, password?: string) => {
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
        throw new Error(`putData ?먮윭: ${error}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, put: false }));
      }
    },
    [apiConfig.url]
  );

  const deleteData = useCallback(
    async (id: string) => {
      setIsLoading((prev) => ({ ...prev, delete: true }));

      try {
        const response = await axiosInstance.delete(
          `${apiConfig.url}/${id}`,
          getAuthHeaders()
        );
        console.log(response);
      } catch (error) {
        throw new Error(`deleteData ?먮윭: ${error}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, delete: false }));
      }
    },
    [apiConfig.url]
  );

  const deleteFile = useCallback(
    async (id: string) => {
      setIsLoading((prev) => ({ ...prev, deleteFile: true }));

      // API 李⑥씠: inquiry??/files/:id, notice/photo??/file/:id
      const isInquiry = apiConfig.url === "/inquiries";
      const endpoint = isInquiry
        ? `${apiConfig.url}/files/${id}`
        : `${apiConfig.url}/file/${id}`;

      try {
        const response = await axiosInstance.delete(endpoint, getAuthHeaders());
        console.log(response);
      } catch (error) {
        throw new Error(`deleteFile ?먮윭: ${error}`);
      } finally {
        setIsLoading((prev) => ({ ...prev, deleteFile: false }));
      }
    },
    [apiConfig.url]
  );

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
