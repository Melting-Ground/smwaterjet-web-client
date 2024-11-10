import axios from "axios";
import { InquiryFileType } from "../_types/inquiry";
import { NoticeFileType } from "../_types/notice";

export const downloadFile = (file: NoticeFileType | InquiryFileType) => {
  const filePath = file.file_path;
  const fileName = filePath.split("/")[2]; // 파일 이름
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/${filePath}`;

  const download = (url: string, name: string) => {
    if (!url) {
      throw new Error("URL을 제공해야 합니다.");
    }

    axios({
      url: url,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const blob = response.data;
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style.display = "none";

        if (name && name.length) {
          a.download = name;
        }

        // 다운로드 링크 클릭
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(blobURL);
      })
      .catch((error) => {
        console.error("파일 다운로드 중 오류 발생", error);
      });
  };

  download(fullUrl, fileName);
};
