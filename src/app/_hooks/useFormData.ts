import useNotice from "./useNotice";

const useFormData = <T extends Record<string, any>>(
  contents: T,
  setContents: React.Dispatch<React.SetStateAction<T>>
) => {
  const { postNotice } = useNotice();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id, type } = e.target as HTMLInputElement;

    if (type === "file") {
      const { files } = e.target as HTMLInputElement;
      if (files) {
        setContents((prev) => ({
          ...prev,
          files: files,
        }));
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

    Object.entries(contents).forEach(([key, value]) => {
      if (value) {
        if (value instanceof FileList) {
          // 파일이 있을 경우
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else {
          formData.append(key, value as string);
        }
      }
    });
    return formData;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = createFormData();
    postNotice(formData);
  };
  return { handleChange, handleSubmit };
};
export default useFormData;
