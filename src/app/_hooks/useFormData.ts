import { APIConfig } from "@/_config/apiConfig";
import { EditMethodType } from "@/_types/board";
import { useAPIData } from "./useAPIData";

const useFormData = <T, P>(
  apiConfig: APIConfig<T>,
  contents?: P, //post, put
  setContents?: React.Dispatch<React.SetStateAction<P>>
) => {
  const { postData, putData, deleteData, deleteFile } =
    useAPIData<T>(apiConfig);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    method: EditMethodType = "upload"
  ) => {
    const { value, id, type } = e.target as HTMLInputElement;
    if (!setContents) return;

    if (type === "file") {
      const { files } = e.target as HTMLInputElement;
      const num = Number(id.at(-1));
      const index = num - 1;
      if (files) {
        const fieldName = method === "update" ? "newFiles" : "files";
        setContents((prev: P) => {
          const fileList = (prev as P & { files: File[] }).files;
          // const fileList = prev.files;
          fileList[index] = files[0];

          return {
            ...prev,
            [fieldName]: fileList,
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

  // post or put
  // TODO: alert 처리 하기, navigate 처리하기
  const uploadForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<string | null> => {
    e.preventDefault();
    const formData = createFormData();
    try {
      const { id } = await postData(formData);
      alert("등록이 완료되었습니다.");
      return id;
    } catch (error) {
      alert("등록 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return null;
    }
  };

  const updateForm = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    deleteFileIds?: number[],
    password?: string
  ) => {
    e.preventDefault();
    const formData = createFormData();
    formData.delete("files");

    // delete file
    if (deleteFileIds) {
      await Promise.all(deleteFileIds.map((id) => deleteFile(id.toString())));
      console.log("파일 전부 삭제 완료");
    }

    try {
      await putData(formData, id, password);
      alert("수정이 완료되었습니다.");
    } catch (error) {
      alert("수정 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const deleteItem = async (id: string): Promise<boolean> => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return false;
    }

    try {
      await deleteData(id);
      alert("삭제가 완료되었습니다.");
      return true;
    } catch (error) {
      alert("삭제 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return false;
    }
  };

  // 파일 하나 지우기
  const deleteFileInItem = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return false;
    }

    try {
      await deleteFile(id);
      alert("삭제가 완료되었습니다.");

      return true;
    } catch (error) {
      alert("삭제 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return false;
    }
  };

  return {
    handleChange,
    uploadForm,
    updateForm,
    deleteItem,
    deleteFileInItem,
  };
};

export default useFormData;
