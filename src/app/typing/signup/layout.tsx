import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "시작 회원가입",
  keywords:
    "회원가입, 송파, 마포, 노원, 강서, 내 주변 문화생활 클래스, 시작 Pick 클래스",
  openGraph: {
    title: "시작 | 시니어를 위한 문화생활 플랫폼",
    description: "시니어를 위한 맞춤형 문화생활 프로그램 제공 플랫폼",
    url: "https://sijak.app/signup",
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
