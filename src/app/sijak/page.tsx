"use client";

import { CarouselApi, Chip, Progress, Skeleton } from "@/shared/ui";
import {
  Description,
  IntroductionBanner,
  LectureCarousel,
  LectureList,
  NotFoundLecture,
  SkeletonCard,
} from "@/entities/lecture/ui";
import {
  GetLocationLectureListParams,
  LectureInfo,
  LectureSize,
  MarkerLectureInfo,
  PickLectureInfo,
  lectureChipContentList,
  lectureChipContentMap,
  shortAddressList,
} from "@/entities/lecture/model/lecture";
import { Location, markerLocationMap } from "@/features/map/model/map";
import { useEffect, useState } from "react";

import { ChipStatus } from "@/shared/ui/Chip/Chip";
import { LoginUserInfo } from "@/entities/user/model/user";
import Map from "@/features/map/ui/Map/Map";
import MapSkeleton from "@/features/map/ui/MapSkeleton/MapSkeleton";
import { deleteCookie } from "cookies-next";
import { useCarouselApi } from "@/shared/lib/useCarouselApi";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import useHomeLectureList from "@/entities/lecture/api/useHomeLectureList";
import useLocationLectureList from "@/entities/lecture/api/useLocationLectureList";
import useLoginedUserStore from "@/shared/store/user";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const SijakHome = () => {
  const [lectureListData, setLectureListData] = useState<LectureInfo[]>();
  const [pickLectureListData, setPickLectureListData] =
    useState<PickLectureInfo[]>();
  const [markerLectureListData, setMarkerLectureListData] =
    useState<MarkerLectureInfo[]>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 0,
    size: 9,
    // dist: 500,
  });
  const [locationLectureParams, setLocationLectureParams] =
    useState<GetLocationLectureListParams>({
      page: 0,
      size: 9,
      location: " ",
    });
  const [user, setUser] = useState<LoginUserInfo>({
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [chipStatus, setChipStatus] = useState<
    Record<shortAddressList, ChipStatus>
  >({
    전체: "active",
    "서울 송파구": "default",
    "서울 마포구": "default",
    "서울 노원구": "default",
    "서울 강서구": "default",
  });
  const [markerLocation, setMarkerLocation] = useState<Location>();

  const { current, count } = useCarouselApi(carouselApi);

  const { loginedUser: loginedUserState, setLoginedUser: setLoginedUserStore } =
    useLoginedUserStore();

  const queryClient = useQueryClient();

  const { loginedUser, setLoginedUser } = useLoginedUserStore();

  const { data: loginUserData, isSuccess: isLoginUserSuccess } =
    useGetLoginUserInfo(loginedUser ? loginedUser.nickname : "");

  const {
    data: locationLectureListData,
    isLoading: isLocationLectureListLoading,
    isSuccess: isLocationLectureListSuccess,
  } = useLocationLectureList({
    params: locationLectureParams,
  });

  const {
    data: homeLectureList,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useHomeLectureList({
    page: lectureSize.page,
    size: lectureSize.size,
  });

  const geolocation = useGeoLocation();

  const router = useRouter();

  // FIXME: 유저 정보 업데이트를 여기서 하는게 맞는지..
  useEffect(() => {
    if (isLoginUserSuccess) {
      setLoginedUser(loginUserData.data.data);
    }
  }, []);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude &&
      loginedUserState
    ) {
      setLoginedUserStore({
        id: loginedUserState.id,
        email: loginedUserState.email,
        nickname: loginedUserState.nickname,
        gender: loginedUserState.gender,
        age_range: loginedUserState.age_range,
        birth: loginedUserState.birth,
        phone_number: loginedUserState.phone_number,
        location: loginedUserState.location,
        latitude: geolocation.curLocation
          ? geolocation.curLocation.latitude
          : 0,
        longitude: geolocation.curLocation
          ? geolocation.curLocation.longitude
          : 0,
      });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation.curLocation]);

  useEffect(() => {
    if (isSuccess) {
      const pickLectureListData = homeLectureList.data.pickClasses;
      const markerLectureListData = homeLectureList.data.markerClasses;
      setPickLectureListData(pickLectureListData);
      setMarkerLectureListData(markerLectureListData);
    }
    if (isError) {
      // TODO: 임시 방편 쿠키 만료 됐을 때 유효한지 체크 후 재발급 해주는 API 필요
      if (error.message === "Request failed with status code 401") {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        queryClient.clear();
      }
    }
  }, [
    user,
    homeLectureList,
    homeLectureList?.data.data,
    homeLectureList?.data.markerClasses,
    homeLectureList?.data.pickClasses,
    isSuccess,
    isError,
  ]);

  useEffect(() => {
    if (
      isLocationLectureListSuccess &&
      locationLectureListData.data.data.data.length > 0
    ) {
      const locationLectureData = locationLectureListData.data.data.data;
      setLectureListData(locationLectureData);
    }
  }, [isLocationLectureListSuccess, locationLectureListData?.data.data.data]);

  const linkToEntireLecture = () => {
    router.push("/entire");
  };

  const calculateProgressBar = () => {
    if (current === count) {
      return 100;
    }
    return (100 / count) * current;
  };

  const filterLectureListByShortAddress = (
    lectureChipContent: shortAddressList,
  ) => {
    setChipStatus(() => {
      return {
        전체: lectureChipContent === "전체" ? "active" : "default",
        "서울 송파구":
          lectureChipContent === "서울 송파구" ? "active" : "default",
        "서울 마포구":
          lectureChipContent === "서울 마포구" ? "active" : "default",
        "서울 노원구":
          lectureChipContent === "서울 노원구" ? "active" : "default",
        "서울 강서구":
          lectureChipContent === "서울 강서구" ? "active" : "default",
      };
    });
    setMarkerLocation(() => {
      return {
        latitude: markerLocationMap(user.latitude, user.longitude)[
          lectureChipContent
        ]["latitude"],
        longitude: markerLocationMap(user.latitude, user.longitude)[
          lectureChipContent
        ]["longitude"],
      };
    });
    setLocationLectureParams((prev) => {
      return {
        ...prev,
        location: lectureChipContentMap[lectureChipContent],
      };
    });
  };

  const renderHomeLectureList = () => {
    if (isLoading || isLocationLectureListLoading) {
      return (
        <div className="flex flex-col">
          <div className="flex flex-row space-x-6 desktop:px-[120px] tablet:px-8 mobile:px-6">
            <SkeletonCard type="homeLecture" />
            <SkeletonCard type="homeLecture" />
            <SkeletonCard type="homeLecture" />
          </div>
          <div className="h-[58px]"></div>
        </div>
      );
    }

    if (
      locationLectureListData?.data.data.data &&
      locationLectureListData?.data.data.data.length > 0
    ) {
      return (
        <div className="flex flex-col desktop:w-full desktop:h-full tablet:w-full tablet:h-full mobile:w-full">
          <div className="desktop:pl-[120px] tablet:px-8 mobile:px-6">
            <LectureCarousel
              lectureInfo={locationLectureListData.data.data.data ?? []}
              setApi={setCarouselApi}
              isNextIcon
              isPreviousIcon
            />
          </div>
          <div className="flex flex-row items-center justify-center desktop:px-[120px] tablet:px-8 mobile:px-6 gap-6">
            <Progress
              value={calculateProgressBar()}
              className="h-[3px] rounded-none"
            />
            <div className="flex flex-row items-center justify-end min-w-[32px] h-[38px] gap-1">
              <div className="text-custom-textBlackColor text-sm font-bold">{`${current}`}</div>
              <div className="text-custom-textDescriptionGrayColor text-sm font-bold">{`/ ${count}`}</div>
            </div>
          </div>
        </div>
      );
    }

    return <NotFoundLecture />;
  };

  const renderPickLectureList = () => {
    if (isLoading) {
      return (
        <div className="flex desktop:flex-row tablet:flex-col gap-6">
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
        </div>
      );
    }

    if (pickLectureListData && pickLectureListData.length > 0) {
      return (
        <LectureList
          lectureListData={homeLectureList?.data.pickClasses ?? []}
          type="pickLecture"
        />
      );
    }

    return (
      <div className="flex w-full items-center justify-center">
        <NotFoundLecture />
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col 16">
      <Description />
      <div className="flex flex-col desktop:pt-[84px] tablet:pt-12 mobile:pt-12 desktop:pb-[120px] tablet:pb-[99px] mobile:pb-[82px] bg-custom-homeMapBackground desktop:gap-[120px] tablet:gap-[80px] mobile:gap-[80px]">
        <section className="flex flex-col desktop:gap-[46px] tablet:gap-6 mobile:gap-[28px]">
          <div className="flex flex-col desktop:px-[120px] tablet:px-8 mobile:px-6 desktop:gap-8 tablet:gap-6 mobile:gap-6">
            <div className="flex flex-row items-center gap-1.5">
              <div className="desktop:text-2xl tablet:text-xl mobile:text-xl font-bold">
                내 주변 문화생활 클래스
              </div>
              <div className="font-sans desktop:text-2xl tablet:text-xl mobile:text-xl font-bold">
                ☺️
              </div>
            </div>
            {isLoading && <MapSkeleton />}
            {lectureListData && markerLectureListData && (
              <Map
                latitude={user.latitude}
                longitude={user.longitude}
                markerLatitude={markerLocation?.latitude}
                markerLongitude={markerLocation?.longitude}
                setLocationLectureParams={setLocationLectureParams}
                setChipStatus={setChipStatus}
                lectureListData={lectureListData}
                markerLectureListData={markerLectureListData}
              />
            )}
          </div>
          <div className="flex flex-col desktop:gap-[46px] tablet:gap-6 mobile:gap-[28px]">
            <div className="flex desktop:flex-row tablet:flex-row mobile:flex-col justify-between desktop:px-[120px] tablet:px-8 mobile:pl-6 mobile:gap-[14px]">
              <div className="flex flex-row gap-2 desktop:max-w-[532px] tablet:max-w-[532px] mobile:w-full overflow-x-scroll scrollbar-hide">
                {lectureChipContentList.map((lectureChipContent, idx) => (
                  <Chip
                    key={idx}
                    content={lectureChipContent}
                    status={chipStatus[lectureChipContent]}
                    handleClick={() =>
                      filterLectureListByShortAddress(lectureChipContent)
                    }
                  />
                ))}
              </div>
              <div className="flex desktop:justify-center tablet:justify-center mobile:justify-end desktop:items-center tablet:items-center content-center text-base">
                <div
                  onClick={linkToEntireLecture}
                  className="px-3 cursor-pointer mobile:pr-6"
                >
                  <div className="flex justify-center items-center gap-1 border-b border-custom-textBlackColor">
                    <div className="desktop:flex tablet:flex mobile:hidden text-sm">
                      클래스
                    </div>
                    <div className="text-sm">더보기</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {renderHomeLectureList()}
            </div>
          </div>
        </section>
        <section className="desktop:px-[120px] tablet:px-8 mobile:px-6 ">
          {isLoading ? (
            <Skeleton className="w-full desktop:h-[217px] tablet:h-[132px] mobile:h-[156px]" />
          ) : (
            <IntroductionBanner />
          )}
        </section>
        <section className="flex flex-col pb-4 desktop:items-start tablet:items-center mobile:items-center desktop:justify-start tablet:justify-start mobile:justify-center desktop:px-[120px] tablet:px-8 mobile:px-6 desktop:gap-8 tablet:gap-5 mobile:gap-5">
          <div className="flex flex-col tablet:w-[704px] mobile:w-[312px] gap-2">
            <div className="font-bold desktop:text-2xl tablet:text-xl mobile:text-xl">
              시ː작 PICK 클래스 📌
            </div>
            <div className="text-custom-tooltipBackground font-medium desktop:text-xl tablet:text-base mobile:text-base">
              조회 수 많은 추천 클래스를 소개할게요!
            </div>
          </div>
          <div className="flex desktop:w-full tablet:w-[704px] mobile:w-[312px] justify-center items-center">
            {renderPickLectureList()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SijakHome;
