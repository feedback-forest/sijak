"use client";

import { BackToPrevious, Button, InputLabel, UnifiedDialog } from "@/shared/ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginUserInfo, PatchUserAddress } from "@/entities/user/model/user";
import { debounce, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { InputLabelStatus } from "@/shared/ui/InputLabel/InputLabel";
import { SquareLoader } from "react-spinners";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import useLoginedUserStore from "@/shared/store/user";
import usePatchUserInfo from "@/entities/user/api/usePatchUserInfo";
import usePostLogout from "@/features/authentication/api/usePostLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/hooks/useToast";
import useValidateNickname from "@/entities/user/api/useValidateNickname";

export const runtime = "edge";

type UserInfoForm = {
  nickname: string;
  address: string;
};

const UserInfoPage = () => {
  const [loginedUser, setLoginedUser] = useState<LoginUserInfo>({
    id: 0,
    email: "",
    nickname: "",
    gender: "",
    age_range: "",
    birth: "",
    phone_number: "",
    latitude: 0,
    longitude: 0,
    location: "",
  });
  const [user, setUser] = useState<PatchUserAddress["Request"]["body"]>();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams<{ id: string }>();
  const geolocation = useGeoLocation();

  const { data, isLoading, isSuccess } = useGetLoginUserInfo(params.id);

  const postLogout = usePostLogout();

  const validateNickname = useValidateNickname();
  // const patchUserAddress = usePatchUserAddress();
  const patchUserInfo = usePatchUserInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm<UserInfoForm>({
    defaultValues: {
      nickname: data?.data.data.nickname,
      address: data?.data.data.location,
    },
  });

  const [status, setStatus] = useState<InputLabelStatus>("default");
  const [message, setMessage] = useState<string>("");

  const queryClient = useQueryClient();

  const { setLoginedUser: setLoginedUserStore } = useLoginedUserStore();
  const { toast } = useToast();

  const validationCheckNickname = debounce((nickname: string) => {
    validateNickname.mutate(
      { nickname },
      {
        onSuccess: (data) => {
          const validateCheck = data.data;
          if (validateCheck && validateCheck.status === 200) {
            clearErrors("nickname"); // 유효성 검사 성공 시 에러 지우기
            setStatus("correct");
            setMessage("사용 가능한 닉네임입니다.");
          }
        },
        onError: (error) => {
          console.error(error);
          if (axios.isAxiosError(error)) {
            const errorMessage =
              error.response?.data?.message || "서버 오류가 발생했습니다.";
            setError("nickname", {
              type: "manual",
              message: errorMessage,
            });
            setStatus("error");
          } else {
            setError("nickname", {
              type: "manual",
              message: "알 수 없는 오류가 발생했습니다.",
            });
          }
        },
      },
    );
  }, 500);

  const handleChangeNickname = (nickname: string) => {
    validationCheckNickname(nickname);
  };

  // const updateCurrentPosition = () => {
  //   if (user) {
  //     patchUserAddress.mutate(
  //       {
  //         latitude: user.latitude,
  //         longitude: user.longitude,
  //       },
  //       {
  //         onSuccess: (data) => {
  //           setValue("address", data.data.data.address);
  //         },
  //       },
  //     );
  //   }
  // };

  const updateUserInfo: SubmitHandler<UserInfoForm> = (data) => {
    patchUserInfo.mutate(
      {
        address: data.address,
        nickname: data.nickname,
      },
      {
        onSuccess: () => {
          toast({ title: "닉네임이 변경 완료됐습니다." });
          window.location.reload();
        },
      },
    );
  };

  const logout = () => {
    postLogout.mutate(undefined, {
      onSuccess: () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        setLoginedUserStore({
          id: 0,
          email: "",
          nickname: "",
          gender: "",
          age_range: "",
          birth: "",
          phone_number: "",
          latitude: 0,
          longitude: 0,
          location: "",
        });
        toast({ title: "다음에 또 봐요~!" });
        queryClient.clear();
        router.push("/");
      },
    });
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (data && isSuccess) {
      setLoginedUser(data.data.data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude
    ) {
      setUser((prev) => {
        return {
          ...prev,
          latitude: geolocation.curLocation
            ? geolocation.curLocation.latitude
            : 0,
          longitude: geolocation.curLocation
            ? geolocation.curLocation.longitude
            : 0,
        };
      });
    }
  }, [geolocation.curLocation]);

  const renderPlaceholder = () => {
    if (loginedUser.gender === "남성") return "남성";
    if (loginedUser.gender === "여성") return "여성";
    return "";
  };

  const triggerItem = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center text-center  desktop:w-[400px] tablet:w-[400px] mobile:w-[260px] max-w-[400px] h-14 bg-white hover:bg-custom-buttonGrayBackground desktop:text-xl tablet:text-xl mobile:text-base font-semibold border border-custom-disabled rounded-md">
          로그아웃
        </div>
      </div>
    );
  };

  const dialogContent = () => {
    return (
      <div className="flex flex-col items-center justify-center desktop:pt-[49px] tablet:pt-[34px] mobile:pt-[34px] desktop:gap-[69px] tablet:gap-[54px] mobile:gap-[54px]">
        <div className="text-xl font-semibold">로그아웃 하시겠어요?</div>
        <div className="flex flex-row gap-2.5">
          <div>
            <Button
              variant="outline"
              className="w-[125px] h-[52px] text-base font-semibold shadow-none"
              onClick={() => setOpenLogoutDialog(false)}
            >
              취소
            </Button>
          </div>
          <div>
            <Button
              className="w-[125px] h-[52px] bg-custom-purple hover:bg-custom-hoverPurple text-base font-semibold shadow-none"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <SquareLoader color="#4F118C" />
      </div>
    );
  }

  return (
    loginedUser && (
      <div className="flex flex-col w-full h-full justify-start items-star desktop:pt-[79px] tablet:pt-8 mobile:pt-6 desktop:gap-[50px] tablet:gap-5 desktop:pb-[323px] tablet:pb-[208px] mobile:pb-[73px] relative">
        <div className="desktop:hidden tablet:flex mobile:hidden absolute top-8 left-4">
          <BackToPrevious />
        </div>
        <section className="desktop:flex tablet:flex mobile:hidden flex-row justify-center items-center h-14 desktop:px-[120px] tablet:px-[184px] mobile:px-[50px]">
          <h1 className="desktop:text-[32px] tablet:text-[28px]">마이페이지</h1>
        </section>
        <div className="flex flex-col justify-center items-center desktop:gap-3 tablet:gap-3 mobile:gap-3">
          <div className="flex flex-col desktop:gap-14 tablet:gap-5 mobile:gap-6">
            <section className="flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col justify-center items-center gap-1">
                <div className="font-bold desktop:h-12 tablet:h-[42px] mobile:h-6 desktop:text-[32px] tablet:text-[28px] mobile:text-base leading-[42px]">
                  {loginedUser.nickname}님
                </div>
                {/* TODO: 연령대, 주소 조건문 처리 */}
                <div className="desktop:h-[33px] tablet:h-[30px] mobile:h-[21px] desktop:text-[22px] tablet:text-[20px] mobile:text-sm text-custom-textGrayColor">
                  {loginedUser.age_range &&
                    // `${userAgeMap[loginedUser.age_range]}대`}
                    `${loginedUser.age_range}`}
                  {/* , {loginedUser.location} */}
                </div>
              </div>
            </section>
            <form
              className="flex flex-col h-full desktop:gap-16 tablet:gap-16 mobile:gap-[42px]"
              onSubmit={handleSubmit(updateUserInfo)}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col desktop:w-[400px] tablet:w-[400px] mobile:w-[260px] gap-6">
                  <Controller
                    name="nickname"
                    control={control}
                    defaultValue={data?.data.data.nickname}
                    rules={{
                      required: "닉네임은 필수로 작성해주셔야 해요.",
                      minLength: {
                        value: 2,
                        message: "띄어쓰기 없이 2자 ~ 12자까지 가능해요.",
                      },
                      maxLength: {
                        value: 12,
                        message: "닉네임은 최대 12자까지 설정 가능합니다.",
                      },
                    }}
                    render={({ field }) => (
                      <InputLabel
                        labelContent="닉네임 입력"
                        placeholder="띄어쓰기 없이 2자 ~ 12자까지 가능해요."
                        error={!!errors.nickname}
                        onChange={(e) => {
                          field.onChange(e.target.value); // react-hook-form의 onChange 호출
                          handleChangeNickname(e.target.value); // 디바운스된 유효성 검사 호출
                        }}
                        onBlur={field.onBlur}
                        value={field.value}
                        status={status}
                        message={errors.nickname?.message || message} // 메시지 처리
                      />
                    )}
                  />
                  {/* <div className="flex flex-row desktop:h-[77px] tablet:h-[77px] mobile:h-[62px] gap-4">
                    <Controller
                      name="address"
                      control={control}
                      defaultValue={data?.data.data.location}
                      render={({ field }) => (
                        <InputLabel
                          labelContent="지역"
                          placeholder={
                            loginedUser.location ? loginedUser.location : ""
                          }
                          onChange={(e) => {
                            field.onChange(e.target.value); // react-hook-form의 onChange 호출
                          }}
                          onBlur={field.onBlur}
                          value={field.value}
                        />
                      )}
                    />
                    <div className="flex items-end desktop:h-[77px] tablet:h-[67px] mobile:h-[62px]">
                      <Button
                        variant="ghost"
                        type="button"
                        className="desktop:w-[112px] tablet:w-[112px] mobile:w-[92px] desktop:h-14 tablet:h-14 mobile:h-[41px] bg-custom-buttonGrayBackground desktop:hover:bg-custom-divGrayBackground tablet:active:bg-custom-divGrayBackground mobile:active:bg-custom-divGrayBackground text-base font-semibold px-3 py-4 rounded-md"
                        onClick={updateCurrentPosition}
                      >
                        <div className="flex flex-row gap-1 mobile:text-sm">
                          <div className="desktop:w-6 tablet:w-6 mobile:w-5 desktop:h-6 tablet:h-6 mobile:h-5">
                            <Image
                              src="/icons/current_location.svg"
                              alt="current_location"
                              width={24}
                              height={24}
                            />
                          </div>
                          현재 위치
                        </div>
                      </Button>
                    </div>
                  </div> */}
                  <InputLabel
                    labelContent="이메일"
                    placeholder={loginedUser.email}
                    disabled
                  />
                  {/* <InputLabel
                    labelContent="휴대폰 번호"
                    placeholder={loginedUser.phone_number}
                    disabled
                  />
                  <InputLabel
                    labelContent="생년월일"
                    placeholder={loginedUser.birth}
                    disabled
                  /> */}
                  <InputLabel
                    labelContent="성별"
                    placeholder={renderPlaceholder()}
                    disabled
                  />
                </div>
              </div>
              <div>
                <Button
                  disabled={
                    !isEmpty(errors.nickname) || !isEmpty(errors.address)
                  }
                  className="desktop:w-[400px] tablet:w-[400px] mobile:w-[260px] desktop:h-14 tablet:h-14 mobile:h-[52px] font-semibold desktop:text-xl tablet:text-xl mobile:text-base bg-custom-purple hover:bg-custom-hoverPurple disabled:bg-custom-textDescriptionGrayColor disabled:opacity-100 rounded-md"
                >
                  저장하기
                </Button>
              </div>
            </form>
          </div>
          <div>
            <UnifiedDialog
              open={openLogoutDialog}
              setOpen={setOpenLogoutDialog}
              triggerItem={triggerItem()}
              dialogTitle="로그아웃 다이얼로그"
              dialogDescription="로그아웃 확인 다이얼로그"
              dialogContent={dialogContent()}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfoPage;
