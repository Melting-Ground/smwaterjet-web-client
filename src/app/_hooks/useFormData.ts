import { APIConfig } from "../_config/apiConfig";
import { useAPIData } from "./useAPIData";

const useFormData = <T, P>(
  apiConfig: APIConfig<T>,
  contents: P, //post
  setContents: React.Dispatch<React.SetStateAction<P>>
) => {
  const { postData } = useAPIData<T>(apiConfig);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id, type } = e.target as HTMLInputElement;

    if (type === "file") {
      const { files } = e.target as HTMLInputElement;
      const num = Number(id.at(-1));
      const index = num - 1;
      if (files) {
        setContents((prev: P) => {
          const fileList = prev.files;
          fileList[index] = files[0];

          return {
            ...prev,
            files: fileList,
          };
        });
      }
    } else {
      setContents((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const createFormData = (): FormData => {
    const formData = new FormData();

    Object.entries(contents as Record<string, unknown>).forEach(
      ([key, value]) => {
        if (value) {
          if (
            Array.isArray(value) &&
            value.some((item) => item instanceof File)
          ) {
            // 파일이 있을 경우
            for (let i = 0; i < value.length; i++) {
              if (value[i]) {
                formData.append(key, value[i]);
              }
            }
          } else if (typeof value === "string") {
            formData.append(key, value);
          }
        }
      }
    );

    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = createFormData();
    postData(formData);
    formData.forEach((item) => console.log(item));
  };
  return { handleChange, handleSubmit };
};

export default useFormData;
