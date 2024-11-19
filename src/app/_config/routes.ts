import { RouteCategoryType } from "../_types/route";

export const companyRoutes: RouteCategoryType = {
  title: "회사소개",
  routes: [
    { path: "/company/greeting", label: "인사말" },
    { path: "/company/history", label: "역사 및 연혁" },
    { path: "/company/certificates", label: "인증 및 특허" },
    { path: "/company/location", label: "오시는길" },
  ],
};

export const businessRoutes: RouteCategoryType = {
  title: "사업영역",
  routes: [
    { path: "/business/waterjet", label: "워터젯이란?" },
    // { path: "/business/cutting", label: "콘크리트 커팅" },
    { path: "/business/chipping", label: "콘트리트 파쇄" },
  ],
};

export const equipmentRoutes: RouteCategoryType = {
  title: "주요장비",
  routes: [{ path: "/equipment", label: "주요장비" }],
};

export const performanceRoutes: RouteCategoryType = {
  title: "사업실적",
  routes: [
    { path: "/performance/overview", label: "실적현황" },
    { path: "/performance/photos", label: "현장사진" },
  ],
};

export const supportRoutes: RouteCategoryType = {
  title: "고객지원",
  routes: [
    { path: "/support/notice", label: "공지사항" },
    { path: "/support/inquiry", label: "문의사항" },
    { path: "/support/news", label: "관련뉴스" },
  ],
};

export const routeCategories: RouteCategoryType[] = [
  companyRoutes,
  businessRoutes,
  equipmentRoutes,
  performanceRoutes,
  supportRoutes,
];
