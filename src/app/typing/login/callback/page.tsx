"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SquareLoader } from "react-spinners";
import { setCookie } from "cookies-next";
import useGetAccessToken from "@/features/authentication/api/useGetAccessToken";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import useLoginedUserStore from "@/shared/store/user";
import { useToast } from "@/shared/hooks/useToast";

const LoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { toast } = useToast();

  // TODO: 임시 토큰 값 api 호출 : GET
  // TODO: response, 임시 토큰 값 가지고 회원가입 예외를 받으면 redirect /signup
  // Access Token을 가져오는 훅
  const {
    data: tokenData,
    error: tokenError,
    isSuccess: isTokenSuccess,
  } = useGetAccessToken(code ? code : "");

  const { loginedUser, setLoginedUser } = useLoginedUserStore();

  // 사용자 정보를 가져오는 훅
  const {
    data: loginUserData,
    isSuccess: isLoginUserSuccess,
    refetch,
  } = useGetLoginUserInfo(loginedUser ? loginedUser.nickname : "");

  useEffect(() => {
    if (isTokenSuccess && tokenData) {
      const accessToken = tokenData.tokenDTO.access_token;
      const refreshToken = tokenData.tokenDTO.refresh_token;

      // 쿠키 설정 15분 ~ 30분 - 토큰 탈취 시간이 짧기 때문에 기보적으로 15분에서 1시간
      setCookie("accessToken", accessToken, {
        path: "/",
        // FIXME: 시간 수정
        maxAge: 60 * 60 * 24,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      // refresh Token 24시간
      setCookie("refreshToken", refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      // 로그인 사용자 정보 요청
      if (isLoginUserSuccess) {
        setLoginedUser(loginUserData.data.data);
        if (tokenData.is_new === true) {
          toast({
            title: "회원가입이 완료되었습니다.",
          });
        }
        if (tokenData.is_new === false) {
          toast({
            title: "로그인 성공!",
          });
        }

        if (tokenData.is_new) {
          router.push("/signup");
        } else {
          router.push("/");
        }
      } else {
        refetch();
      }
    }

    if (tokenError) {
      toast({
        title: "로그인 실패!",
      });
    }
  }, [
    code,
    tokenData,
    tokenError,
    isTokenSuccess,
    isLoginUserSuccess,
    loginUserData,
    router,
    setLoginedUser,
    refetch,
  ]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SquareLoader color="#4F118C" />
    </div>
  );
};

const LoginCallbackPage = () => {
  return (
    <Suspense>
      <LoginCallback />
    </Suspense>
  );
};

export default LoginCallbackPage;
