export interface CertificateType {
  id: number;
  path: string;
  uploaded_at: string;
  title: string;
}

export interface CertificatePostType {
  title: string;
  file: File | null;
}
