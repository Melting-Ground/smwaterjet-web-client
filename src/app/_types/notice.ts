export interface NoticePostType {
  title: string;
  content: string;
  author: string;
  files: File | null[];
}
export interface NoticeType {
  content: string;
  created_at: string;
  files: NoticeFileType[];
  id: number;
  title: string;
  username: string;
}

export interface NoticeFileType {
  file_path: string;
  id: number;
  notice_id: number;
}
