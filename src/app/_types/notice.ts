import { FileWithIdType } from "./file";

export interface NoticePostType {
  title: string;
  content: string;
  author: string;
  files: File[] | FileWithIdType[]; // 새로 등록 | 이미 있는
}

export interface NoticeType {
  content: string;
  created_at: string;
  files: NoticeFileType[];
  id: number;
  title: string;
  author: string;
  count: number;
}

export interface NoticeFileType {
  file_path: string;
  id: number;
  notice_id: number;
}
