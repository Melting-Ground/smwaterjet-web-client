import { CertificatePostType, CertificateType } from "@/_types/certificate";
import { InquiryPostType, InquiryType } from "@/_types/inquiry";
// import { NewsPostType, NewsType } from "../_types/news";
import { NoticePostType, NoticeType } from "@/_types/notice";
import { PhotoPostType, PhotoType } from "@/_types/photo";
import { ReportPostType, ReportType } from "@/_types/report";

export type HttpMethodType = "get" | "post" | "put";

export interface APIConfig<T = unknown, P = unknown> {
  url: string;
  method: Partial<Record<HttpMethodType, T | P>>;
}

const API_URLS = {
  notices: {
    url: "/support/notices",
    method: {
      get: {} as NoticeType,
      post: {} as NoticePostType,
      put: {} as NoticePostType,
    },
  },
  inquiries: {
    url: "/support/inquiries",
    method: {
      get: {} as InquiryType,
      post: {} as InquiryPostType,
      put: {} as InquiryPostType,
    },
  },
  reports: {
    url: "/performance/reports", // 임시
    method: {
      get: {} as ReportType,
      post: {} as ReportPostType,
      put: {} as ReportPostType,
    },
  },
  // 작업사진
  photos: {
    url: "/performance/photos",
    method: {
      get: {} as PhotoType,
      post: {} as PhotoPostType,
      put: {} as PhotoPostType,
    },
  },

  certificates: {
    url: "/company/certificates",
    method: {
      get: {} as CertificateType,
      post: {} as CertificatePostType,
    },
  },
  // inquiries: {
  //   url: {
  //     list: "/support/inquiries",
  //     detail: (id: string) => `/support/inquiries/${id}`,
  //   },
  //   type: {
  //     list: [] as InquiryType[],
  //     detail: {} as InquiryType,
  //   },
  // },
};

const API_SETTINGS = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
};

export { API_SETTINGS, API_URLS };
