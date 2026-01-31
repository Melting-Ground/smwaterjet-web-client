export interface CertificateType {
  id: number;
  path: string;
  title: string;
  uploaded_at?: string;
}

export interface CertificatePostType {
  title: string;
  file: File | null;
}
