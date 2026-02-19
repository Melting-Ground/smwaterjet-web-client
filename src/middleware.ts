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

const CANONICAL_HOST = "www.smwaterjet.com";
const ROOT_DOMAINS = new Set(["smwaterjet.com", "www.smwaterjet.com"]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const requestHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    url.host;
  const requestProtocol =
    request.headers.get("x-forwarded-proto") ??
    url.protocol.replace(":", "");

  const isRootDomain = ROOT_DOMAINS.has(requestHost);
  const needsHostRedirect = isRootDomain && requestHost !== CANONICAL_HOST;
  const needsHttpsRedirect = isRootDomain && requestProtocol === "http";
  const needsSlashRedirect = pathname.length > 1 && pathname.endsWith("/");

  if (needsHostRedirect || needsHttpsRedirect || needsSlashRedirect) {
    if (needsHostRedirect || needsHttpsRedirect) {
      url.host = CANONICAL_HOST;
      url.protocol = "https:";
    }

    if (needsSlashRedirect) {
      url.pathname = pathname.replace(/\/+$/, "");
    }

    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || /\.[^/]+$/.test(pathname)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const segments = pathname.split("/").filter(Boolean);
  const root = segments[0]?.toLowerCase();

  if (!root) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const rule = SECTION_RULES[root];
  if (!rule) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (segments.length === 1) {
    return NextResponse.redirect(new URL(rule.defaultPath, request.url), 308);
  }

  const section = segments[1]?.toLowerCase();
  if (section && !rule.validSections.has(section)) {
    return NextResponse.redirect(new URL(rule.defaultPath, request.url), 308);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/:path*"],
};
