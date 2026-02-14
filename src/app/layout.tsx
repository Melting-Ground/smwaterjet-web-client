import type { Metadata } from "next";
import localFont from "next/font/local";
import "./_styles/main.scss";
import styles from "./layout.module.scss";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import Banner from "./_components/Banner/Banner";
import ClientWrapper from "./clientWrapper";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smwaterjet.com"),
  title: "워터젯 치핑·콘크리트 파쇄 전문 | 성문워터젯",
  description:
    "워터젯 치핑 전문 시공업체 성문워터젯입니다. 초고압 워터젯 공법을 이용해 콘크리트 치핑, 교량 보수, 구조물 파쇄를 정밀하고 안전하게 수행합니다.",
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "naver-site-verification": "28d6847d7be98dd552ef10df1c0a2fdbd4decea",
    },
  },
  openGraph: {
    title: "워터젯 치핑·콘크리트 파쇄 전문 | 성문워터젯",
    description:
      "초고압 워터젯 공법 기반 콘크리트 치핑·교량 보수·구조물 파쇄 전문 시공업체",
    url: "https://www.smwaterjet.com",
    siteName: "성문워터젯",
    type: "website",
    images: [
      {
        url: "/images/logo/logo.png",
        alt: "성문워터젯 로고",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        ></script>
      </head>
      <body className={`${pretendard.className} ${styles.body}`}>
        <ClientWrapper>
          <Header />
          <Banner />
          <main className={styles.main}>
            <div className={styles["main-inner"]}>{children}</div>
          </main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
