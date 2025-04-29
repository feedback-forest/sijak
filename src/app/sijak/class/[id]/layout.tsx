import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "클래스 상세",
  description:
    "시니어를 위한 현재 신청 가능한 클래스, 내 주변 클래스, 궁금한 클래스의 모든 것 | 서울, 송파, 마포, 노원, 강서, 내 주변 문화생활 클래스",
  keywords: "송파, 마포, 노원, 강서, 내 주변 문화생활 클래스, 시작 Pick 클래스",
  openGraph: {
    title: "시작 | 시니어를 위한 문화생활 플랫폼",
    description: "시니어를 위한 맞춤형 문화생활 프로그램 제공 플랫폼",
    url: "https://sijak.app/",
    locale: "ko_KR",
    type: "website",
  },
};

{
  /* <Seo
  title={lectureInfo ? lectureInfo.name : "클래스 상세"}
  description={
    lectureInfo
      ? lectureInfo.description
      : "시니어를 위한 현재 신청 가능한 클래스, 내 주변 클래스, 궁금한 클래스의 모든 것 | 서울, 송파, 마포, 노원, 강서, 내 주변 문화생활 클래스"
  }
  keyword="송파, 마포, 노원, 강서, 내 주변 문화생활 클래스, 시작 Pick 클래스"
  // FIXME: 수정 필요
  url={`https://sijak.app/class/${Number(id)}`}
/>; */
}

const LectureDetailLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return <>{children}</>;
};

export default LectureDetailLayout;
