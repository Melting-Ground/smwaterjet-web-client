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
  title: "성문워터젯-콘크리트 치핑, 파쇄, 커팅",
  description: "콘크리트 워터젯 커팅 및 치핑 전문 업체 성문워터젯입니다. 다양한 현장에서 정밀하고 안전한 시공을 수행하고 있습니다.",
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
