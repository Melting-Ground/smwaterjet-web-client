import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type SectionRule = {
  defaultPath: string;
  validSections: Set<string>;
};

const SECTION_RULES: Record<string, SectionRule> = {
  business: {
    defaultPath: "/business/waterjet",
    validSections: new Set(["waterjet", "fields", "photos"]),
  },
  company: {
    defaultPath: "/company/greeting",
    validSections: new Set(["greeting", "history", "certificates", "location"]),
  },
  support: {
    defaultPath: "/support/notice",
    validSections: new Set(["notice", "inquiry", "news"]),
  },
  policy: {
    defaultPath: "/policy/privacy",
    validSections: new Set(["privacy", "email", "tos"]),
  },
  performance: {
    defaultPath: "/performance/photos",
    validSections: new Set(["photos"]),
  },
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || /\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const root = segments[0]?.toLowerCase();

  if (!root) {
    return NextResponse.next();
  }

  const rule = SECTION_RULES[root];
  if (!rule) {
    return NextResponse.next();
  }

  if (segments.length === 1) {
    return NextResponse.redirect(new URL(rule.defaultPath, request.url), 308);
  }

  const section = segments[1]?.toLowerCase();
  if (section && !rule.validSections.has(section)) {
    return NextResponse.redirect(new URL(rule.defaultPath, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
