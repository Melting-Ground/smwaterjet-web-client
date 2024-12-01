import { InquiryPostType, InquiryType } from "../_types/inquiry";
import { NewsPostType, NewsType } from "../_types/news";
import { NoticePostType, NoticeType } from "../_types/notice";

export interface APIConfig<T = unknown, P = unknown> {
  url: string;
  method: {
    get?: T;
    post?: P;
  };
}

const API_URLS = {
  notices: {
    url: "/support/notices",
    method: {
      get: {} as NoticeType,
      post: {} as NoticePostType,
    },
  },
  inquiries: {
    url: "/support/inquiries",
    method: {
      get: {} as InquiryType,
      post: {} as InquiryPostType,
    },
  },
  overview: {
    url: "/performance/overview", // 임시
    method: {
      get: {} as OverviewType,
      post: {} as OverviewType,
    },
  },

  // certificates: {
  //   url: "/company/certificates",
  //   method: {
  //     get: {} as InquiryType,
  //     post: {} as InquiryPostType,
  //   },
  // },
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
