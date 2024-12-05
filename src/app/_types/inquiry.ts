import { FileWithIdType } from "./file";

export interface InquiryPostType {
  author: string;
  phone_number: string;
  email: string;
  title: string;
  content: string;
  password: string;
  files: (FileWithIdType | File | null)[]; // 새로 등록 | 이미 있는
}

export interface InquiryType {
  id: number;
  author: string;
  phone_number: string;
  password: string;
  email: string;
  title: string;
  content: string;
  created_at: string;
  files: InquiryFileType[];
}

export interface InquiryFileType {
  id: number;
  file_path: string;
  inquiry_id: string;
}
