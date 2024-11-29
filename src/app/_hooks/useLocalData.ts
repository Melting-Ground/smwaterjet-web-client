import axios from "axios";
import { useEffect, useState } from "react";

export const useLocalData = <T>(dataName: string) => {
  const [data, setData] = useState<T>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/data/${dataName}.json`);
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchData();
  }, []);
  return { data };
};
