import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "찜 페이지",
  description: "내가 찜한 클래스 보기",
  keywords:
    "찜, 좋아요, 문화센터, 신청 가능한 클래스, 원데이 클래스, 정기 클래스",
  openGraph: {
    title: "시작 | 시니어를 위한 문화생활 플랫폼",
    description: "시니어를 위한 맞춤형 문화생활 프로그램 제공 플랫폼",
    url: "https://sijak.app/like",
    locale: "ko_KR",
    type: "website",
  },
};

const LectureEntireLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return <>{children}</>;
};

export default LectureEntireLayout;
