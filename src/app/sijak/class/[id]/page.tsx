"use client";

import { IconButton, Skeleton } from "@/shared/ui";
import { Lecture, LecturePayload } from "@/entities/lecture/model/lecture";
import {
  LectureDetail,
  LectureFooter,
  LectureImageInfo,
  LectureSummary,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import Image from "next/image";
import LectureMinimap from "@/entities/lecture/ui/LectureSummary/LectureMinimap/LectureMinimap";
import Link from "next/link";
import { SquareLoader } from "react-spinners";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useLectureInfo from "@/entities/lecture/api/useLectureInfo";
import { useParams } from "next/navigation";

export const runtime = "edge";

const LectureInfoPage = () => {
  const [lectureInfo, setLectureInfo] = useState<Lecture>();
  const [user, setUser] = useState<LecturePayload>();
  const [windowInnerWidth, setWindowInnerWidth] = useState<string>();
  const [heart, setHeart] = useState<boolean>(false);

  const { id } = useParams();

  const getLectureInfo = useLectureInfo(Number(id));
  const isLoading = getLectureInfo.isIdle || getLectureInfo.isPending;

  const geolocation = useGeoLocation();

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1440) {
      // desktop
      setWindowInnerWidth("desktop");
    } else if (width >= 768) {
      // tablet
      setWindowInnerWidth("tablet");
    } else {
      // mobile
      setWindowInnerWidth("mobile");
    }
  };

  useEffect(() => {
    if (user) {
      getLectureInfo.mutate(
        {
          lectureId: Number(id),
          payload: { latitude: user.latitude, longitude: user.longitude },
        },
        {
          onSuccess: (data) => {
            setLectureInfo(data.data.data);
            setHeart(data.data.data.heart);
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

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

  useEffect(() => {
    handleResize(); // 초기 렌더링 시 크기 설정
    window.addEventListener("resize", handleResize); // resize 이벤트 리스너 추가

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);

  const renderSummary = () => {
    if (windowInnerWidth === "desktop") {
      return renderDesktopSummary();
    }
    if (windowInnerWidth === "tablet") {
      return renderTabletSummary();
    }
    if (windowInnerWidth === "mobile") {
      return renderMobileSummary();
    }
  };

  const renderDesktopSummary = () => {
    return (
      <section className="desktop:flex tablet:hidden mobile:hidden w-full">
        <div className="flex flex-row w-full desktop:px-[120px] desktop:pt-[80px] gap-10">
          {isLoading && (
            <Skeleton className="desktop:w-[588px] tablet:w-[330px] desktop:h-[588px] tablet:h-[330px]" />
          )}
          {lectureInfo && (
            <LectureImageInfo
              lectureInfo={lectureInfo}
              isLoading={isLoading}
              heart={heart}
              setHeart={setHeart}
            />
          )}
          <div className="flex flex-col gap-6">
            <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
            <LectureMinimap lectureInfo={lectureInfo} isLoading={isLoading} />
          </div>
        </div>
      </section>
    );
  };

  const renderTabletSummary = () => {
    return (
      <section className="desktop:hidden tablet:flex mobile:hidden">
        <div className="flex flex-col tablet:px-8 gap-[35px]">
          <div className="flex flex-row w-full gap-[31px]">
            {isLoading && (
              <Skeleton className="desktop:w-[588px] tablet:w-[330px] desktop:h-[588px] tablet:h-[330px]" />
            )}
            {lectureInfo && (
              <LectureImageInfo
                lectureInfo={lectureInfo}
                isLoading={isLoading}
                heart={heart}
                setHeart={setHeart}
              />
            )}
            <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
          </div>
          <div>
            <LectureMinimap lectureInfo={lectureInfo} isLoading={isLoading} />
          </div>
        </div>
      </section>
    );
  };

  const renderMobileSummary = () => {
    return (
      <section className="desktop:hidden tablet:hidden mobile:flex">
        <div className="flex flex-col w-full mobile:px-6 mobile:pt-[25px]  gap-8">
          {isLoading && (
            <Skeleton className="desktop:w-[588px] tablet:w-[330px] desktop:h-[588px] tablet:h-[330px]" />
          )}
          {lectureInfo && (
            <LectureImageInfo
              lectureInfo={lectureInfo}
              isLoading={isLoading}
              heart={heart}
              setHeart={setHeart}
            />
          )}
          <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
          <LectureMinimap lectureInfo={lectureInfo} isLoading={isLoading} />
        </div>
      </section>
    );
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen desktop:max-w-[1440px] tablet:max-w-[768px] mobile:max-w-[360px]  mx-auto my-0">
        <div className="flex items-center justify-center w-full h-full">
          <SquareLoader color="#4F118C" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full justify-start items-start desktop:gap-8 tablet:gap-[34px] mobile:gap-[44px] desktop:max-w-[1440px] tablet:max-w-[768px] mobile:max-w-[360px] mx-auto my-0">
      <section className="w-full desktop:hidden tablet:flex mobile:hidden pl-4 pt-10">
        <Link href="/">
          <Image
            src="/icons/back_arrow_left.svg"
            alt="back"
            width={48}
            height={48}
          />
        </Link>
      </section>
      {renderSummary()}
      {lectureInfo && (
        <LectureDetail lectureInfo={lectureInfo} isLoading={isLoading} />
      )}
      {isLoading && (
        <div className="flex flex-row items-center w-full desktop:h-[70px] tablet:h-[70px] mobile:h-[55px] desktop:px-[120px] bg-white fixed bottom-0 border-t border-custom-disabled z-10">
          <div className="flex desktop:w-[98px] tablet:min-w-[98px] mobile:min-w-[76px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] border-r border-custom-disabled justify-center items-center">
            <Skeleton>
              <IconButton
                src="/icons/like.svg"
                alt="heart"
                iconWidth={32}
                iconHeight={32}
                loading={isLoading}
              />
            </Skeleton>
          </div>
          <div className="flex desktop:w-[190px] tablet:min-w-[190px] mobile:min-w-[111px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px] justify-center items-center text-xl font-bold">
            <Skeleton className="w-[100px] h-[33px]" />
          </div>
          <Skeleton className="desktop:w-[912px] tablet:w-[481px] mobile:w-[173px] desktop:h-[69px] tablet:h-[69px] mobile:h-[54px]" />
        </div>
      )}
      {lectureInfo && (
        <LectureFooter
          lectureInfo={lectureInfo}
          isLoading={isLoading}
          heart={heart}
          setHeart={setHeart}
        />
      )}
    </div>
  );
};

export default LectureInfoPage;
