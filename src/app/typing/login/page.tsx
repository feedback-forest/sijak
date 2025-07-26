"use client";

import useKakaoTempToken from "@/features/typing/api/useKakaoLogin";
import { Button, LinkArrowLeft, UnifiedTooltip } from "@/shared/ui";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const LoginPage = () => {
  // TODO: 로그인 로직 수정 | 용범님과 대화 필요
  const REST_API_KEY = process.env.NEXT_PUBLIC_TYPING_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_TYPING_KAKAO_LOGIN_REDIRECT_URI;
  // TODO: 카카오 회원가입 설정 변경
  // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const link = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/oauth2/authorization/kakao`;

  const router = useRouter();
  const pathname = usePathname();

  const linkToKakaoLogin = () => {
    window.location.href = link;
    console.log(pathname);
    // TODO: 로그인 및 회원가입 api 호출
  };

  // TODO: 로그인 및 회원가입 api 호출 이후 로그인 성공 시 : zustand store에 토큰 및 로그인 유저 정보 저장

  // TODO: 로그인 및 회원가입 api 호출 이후 회원가입 시 : 회원가입 화면으로 redirect

  const triggerItem = () => {
    return (
      <Button
        className="bg-custom-kakao hover:bg-custom-hoverKakao text-black desktop:w-[351px] tablet:w-[351px] mobile:w-[260px] h-[56px]"
        size="lg"
        onClick={linkToKakaoLogin}
      >
        <div className="flex gap-2 items-center justify-center text-base">
          <Image
            src={"/icons/kakao_logo.svg"}
            alt="kakao logo"
            width={18}
            height={18}
          />
          카카오톡 간편 로그인
        </div>
      </Button>
    );
  };

  const tooltipContent = () => {
    return (
      <div className="flex flex-col justify-center items-center w-[168px] h-10 bg-custom-tooltipBackground rounded-3xl relative">
        <div className="absolute bottom-[-3.5px]">
          <Image
            src="/images/kakao_tooltip_arrow.png"
            alt="tooltip arrow"
            width={7}
            height={7}
            className="bg-custom-tooltipBackground rotate-45"
          />
        </div>
        <div className="font-bold text-sm text-white">🎉 5초만에 시작하기!</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full desktop:h-[calc(100vh-70px)] tablet:h-[calc(100vh-70px)] mobile:h-[calc(100vh-48px)] justify-center items-center pb-4 mobile:relative">
      <div className="desktop:hidden tablet:hidden mobile:absolute top-3 left-4">
        <LinkArrowLeft href="/" width={48} height={48} />
      </div>
      <section className="flex flex-col desktop:h-[255px] tablet:h-[255px] mobile:h-[231px] gap-24">
        <div className="flex flex-col">
          <div className="flex w-full flex-col justify-center items-center">
            <div className="text-custom-textBlackColor desktop:text-[40px] tablet:text-[40px] mobile:text-[28px] desktop:leading-[52px] tablet:leading-[52px] mobile:leading-[36px] font-bold">
              반가워요!
            </div>
            <div className="text-custom-textBlackColor desktop:text-[40px] tablet:text-[40px] mobile:text-[28px] desktop:leading-[52px] tablet:leading-[52px] mobile:leading-[36px] font-normal">
              오늘부터 시ː작해요!
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <UnifiedTooltip
            open={true}
            triggerItem={triggerItem()}
            tooltipContent={tooltipContent()}
            contentClassName="bg-white"
          />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
