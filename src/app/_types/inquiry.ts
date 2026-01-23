import { FileWithIdType } from "./file";

export interface InquiryPostType {
  author: string;
  phone_number: string;
  title: string;
  content: string;
  password: string;
  files: (FileWithIdType | File | null)[]; // 새로 등록 | 이미 있는
}

export interface InquiryType {
  // list에서는 files/content가 없을 수 있음
  row_num?: number;
  id: number;
  author: string;
  phone_number?: string;
  title: string;
  content?: string;
  created_at: string;
  files?: InquiryFileType[];
}

export interface InquiryFileType {
  id: number;
  file_path: string;
}
