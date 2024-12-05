import { FileWithIdType } from "@/_types/file";
import { InquiryPostType } from "@/_types/inquiry";
import { NoticePostType } from "@/_types/notice";
import { useEffect, useState } from "react";

const useBoardFiles = (contents: NoticePostType | InquiryPostType) => {
  const FILE_LENGTH = 5;
  const [files, setFiles] = useState<(FileWithIdType | File | null)[]>([]);

  // 지울 파일 목록 아이디
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

  useEffect(() => {
    const fileArray: (FileWithIdType | File | null)[] = [];

    // 이미 있던 파일들을 목록에 넣기
    contents.files.forEach((file) => {
      if (!file || file instanceof File) {
        return;
      }
      fileArray.push({ id: file.id, file_path: file.file_path });
    });

    // 나머지 목록은 null로 채우기
    for (let i = 0; i < FILE_LENGTH - contents.files.length; i++) {
      fileArray.push(null);
    }

    setFiles(fileArray);
  }, [contents.files]);

  const deleteFile = (fileId: string) => {
    // 파일 목록에서 제거 (해당 파일 null로 변경)
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file && "id" in file && file.id.toString() === fileId ? null : file
      )
    );
    // 지울 파일 목록에 아이디 추가
    setDeleteFileIds((prev) => [...prev, Number(fileId)]);
  };

  return { files, deleteFile, deleteFileIds };
};
export default useBoardFiles;
