export interface InquiryPostType {
  author: string;
  phone_number: string;
  email: string;
  title: string;
  content: string;
  password: string;
  files: File[] | null;
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
