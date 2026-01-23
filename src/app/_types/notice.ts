import { FileWithIdType } from "./file";

export interface NoticePostType {
  title: string;
  content: string;
  author: string;
  files: (FileWithIdType | File | null)[]; // 새로 등록 | 이미 있는
}

export interface NoticeType {
  // list에서는 files/content가 없을 수 있음
  row_num?: number;
  id: number;
  title: string;
  author: string;
  created_at: string;
  content?: string;
  files?: NoticeFileType[];
}

export interface NoticeFileType {
  id: number;
  file_path: string;
}
