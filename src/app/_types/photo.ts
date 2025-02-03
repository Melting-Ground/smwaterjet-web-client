// 작업사진
export interface PhotoPostType {
  title: string;
  year?: number;
  path: string;
}

export interface PhotoType extends PhotoPostType {
  id: number;
  uploaded_at?: number;
}
