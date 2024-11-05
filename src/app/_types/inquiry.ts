export interface InquiryPostType {
  title: string;
  content: string;
  author: string;
  phone_number: string;
  password: string;
  files: FileList | null;
}

export interface InquiryType {
  id: number;
  username: string;
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
  inquiry_id: number;
  name: string;
  path: string;
}
