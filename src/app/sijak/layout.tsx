import "../globals.css";

import { Footer, Header, ToastToaster, Toaster } from "@/shared/ui";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Providers from "@/features/provider/Provider";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "시작 : 50+ 시ː니어를 위한 문화생활 사이트",
  description: "주변의 기회를 찾다, 시니어를 위한 맞춤형 프로그램",
  keywords:
    "송파, 마포, 노원, 강서, 내 주변 문화생활 클래스, 시작 Pick 클래스, 찜, 좋아요, 문화센터, 신청 가능한 클래스, 원데이 클래스, 정기 클래스, 전체 클래스, 문화센터 프로그램, 지자체, 시니어, 인기 문화 강좌, 4050, 5060",
  openGraph: {
    title: "시작",
    description: "주변의 기회를 찾다, 시니어를 위한 맞춤형 프로그램",
    url: "https://sijak.app",
    images: [
      {
        url: "https://s3.ap-northeast-2.amazonaws.com/sijak.app/twitter/og_url.png",
        width: 800,
        height: 418,
        alt: "이미지 설명",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "시작",
    description: "주변의 기회를 찾다, 시니어를 위한 맞춤형 프로그램",
    images: [
      "https://s3.ap-northeast-2.amazonaws.com/sijak.app/twitter/og_url.png",
    ],
  },
};

export default function SijakRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={`${pretendard.className} flex flex-col w-full h-full`}>
        <Providers>
          <main className="flex w-full h-full flex-1">
            <div className="flex flex-col w-full h-full justify-start items-start relative">
              <div className="flex flex-col w-full h-full justify-start items-start relative max-w-[1440px] mx-auto my-0">
                <Header />
                <div className="flex flex-col w-full h-full justify-start items-start desktop:pt-[70px] tablet:pt-[70px] mobile:pt-12">
                  {children}
                </div>
              </div>
            </div>
          </main>
          <Footer />
          <Toaster />
          <ToastToaster />
        </Providers>
      </div>
      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_GTM_ID && (
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_GTM_ID}
        />
      )}
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GA_ID && (
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GA_ID}
        />
      )}
      {process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" && <Analytics />}
    </>
  );
}
