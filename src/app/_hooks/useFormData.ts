import { useEffect, useState } from "react";
import { APIConfig } from "../_config/apiConfig";
import { useAPIData } from "./useAPIData";

const useFormData = <T, P>(
  apiConfig: APIConfig<T>,
  contents: P, //post
  setContents: React.Dispatch<React.SetStateAction<P>>
) => {
  const { postData } = useAPIData<T>(apiConfig);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  // useEffect(() => {
  //   const trackFormChanges = () => {
  //     setIsFormDirty(true);
  //   };

  //   // Add event listeners to all inputs and textareas
  //   const inputs = document.querySelectorAll("input, textarea");
  //   inputs.forEach((input) => {
  //     input.addEventListener("change", trackFormChanges);
  //   });

  //   return () => {
  //     inputs.forEach((input) => {
  //       input.removeEventListener("change", trackFormChanges);
  //     });
  //   };
  // }, []);

  // // Prevent navigation when form is dirty
  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     if (isFormDirty) {
  //       e.preventDefault();
  //       e.returnValue = "변경 사항이 저장되지 않을 수 있습니다.";
  //       return "변경 사항이 저장되지 않을 수 있습니다.";
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [isFormDirty]);

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
    setIsFormDirty(false);
  };
  return { handleChange, handleSubmit, isFormDirty };
};

export default useFormData;
