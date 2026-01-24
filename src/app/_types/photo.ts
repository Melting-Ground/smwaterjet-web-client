import { FileWithIdType } from "./file";

// 작업사진 (백엔드: /photos, multipart(files), title)
export interface PhotoPostType {
  title: string;
  files: (FileWithIdType | File | null)[];
  newFiles?: (FileWithIdType | File | null)[];
}

export interface PhotoType {
  row_num?: number;
  id: number;
  title: string;
  thumbnail_path: string;
  created_at: string;
  // 프론트 전용: 이미지 전체 URL
  path?: string;
  files?: { id: number; file_path: string }[];
}
