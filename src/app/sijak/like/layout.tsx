import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "전체 클래스",
  description:
    "내 주변 문화생활 클래스 모두 확인하기, 지도로 살펴보는 내 주변 클래스, 송파, 마포, 노원, 강서 지자체 문화센터 클래스 확인하기",
  keywords:
    "전체 클래스, 문화센터 프로그램, 지자체, 시니어, 인기 문화 강좌, 4050, 5060, 송파, 마포, 노원, 강서, 내 주변 문화생활 클래스, 시작 Pick 클래스",
  openGraph: {
    title: "시작 | 시니어를 위한 문화생활 플랫폼",
    description: "시니어를 위한 맞춤형 문화생활 프로그램 제공 플랫폼",
    url: "https://sijak.app/entire",
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
