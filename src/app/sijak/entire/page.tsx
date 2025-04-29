"use client";

import Chip, { ChipStatus } from "@/shared/ui/Chip/Chip";
import {
  GetLocationLectureListParams,
  LectureInfo,
  lectureChipContentList,
  lectureChipContentMap,
  shortAddressList,
} from "@/entities/lecture/model/lecture";
import {
  LectureList,
  NotFoundLecture,
  SkeletonCard,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { BackToPrevious } from "@/shared/ui";
import { useInView } from "react-intersection-observer";
import useLocationLectureList from "@/entities/lecture/api/useLocationLectureList";

const EntirePage = () => {
  const [lectureListData, setLectureListData] = useState<LectureInfo[]>([]);
  const [locationLectureParams, setLocationLectureParams] =
    useState<GetLocationLectureListParams>({
      page: 0,
      size: 9,
      location: " ",
    });
  const [chipStatus, setChipStatus] = useState<
    Record<shortAddressList, ChipStatus>
  >({
    전체: "active",
    "서울 송파구": "default",
    "서울 마포구": "default",
    "서울 노원구": "default",
    "서울 강서구": "default",
  });
  const [hasNext, setHasNext] = useState(true);

  const { ref, inView } = useInView({
    threshold: 1.0, // 100% 보일 때 트리거
  });

  const {
    data: locationLectureListData,
    isLoading,
    isSuccess,
  } = useLocationLectureList({
    params: locationLectureParams,
  });

  const filterLectureListByShortAddress = (
    lectureChipContent: shortAddressList,
  ) => {
    if (chipStatus[lectureChipContent] === "active") return;
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
    setLectureListData([]);
    setLocationLectureParams(() => {
      return {
        page: 0,
        size: 9,
        location: lectureChipContentMap[lectureChipContent],
      };
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setLectureListData((prev) => [
        ...prev,
        ...locationLectureListData.data.data.data,
      ]);
      setHasNext(locationLectureListData.data.data.hasNext);
    }
  }, [
    isSuccess,
    locationLectureListData?.data.data.data,
    locationLectureListData?.data.data.hasNext,
  ]);

  useEffect(() => {
    if (inView && hasNext && !isLoading) {
      setLocationLectureParams((prev) => {
        return {
          ...prev,
          page: prev.page + 1,
        };
      }); // 다음 페이지 데이터 로드
    }
  }, [inView, hasNext, isLoading]);

  const renderEntireCardContent = () => {
    if (lectureListData && lectureListData.length > 0) {
      return (
        <div>
          <LectureList lectureListData={lectureListData} type="pickLecture" />
          <div ref={ref} className="desktop:h-6 tablet:h-4 mobile:h-9" />
          {/* 스크롤 감지 요소 */}
          {isLoading && (
            <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9">
              <SkeletonCard type="pickLecture" />
              <SkeletonCard type="pickLecture" />
              <SkeletonCard type="pickLecture" />
            </div>
          )}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9">
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
          <SkeletonCard type="pickLecture" />
        </div>
      );
    }

    return <NotFoundLecture />;
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh_-_208px)] justify-start items-center desktop:pt-20 tablet:pt-10 mobile:pt-10 bg-custom-homeMapBackground relative gap-[28px]">
      <div className="desktop:hidden tablet:flex mobile:hidden absolute top-10 left-4">
        <BackToPrevious />
      </div>
      <section className="flex flex-col w-full h-full desktop:px-[120px] tablet:px-8 mobile:pl-6 desktop:gap-10 tablet:gap-[35px] mobile:gap-8">
        <div className="desktop:flex tablet:flex mobile:hidden flex-row w-full h-12 items-start justify-center">
          <div className="flex flew-row gap-1">
            <h1 className="text-custom-textBlackColor text-[32px]">
              전체 클래스
            </h1>
            <div className="desktop:flex tablet:flex mobile:hidden text-custom-textBlackColor text-[32px]">
              리스트
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 desktop:max-w-[532px] tablet:max-w-[532px] mobile:max-w-full overflow-x-scroll scrollbar-hide">
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
      </section>
      <section className="flex flex-col desktop:pt-0 tablet:pt-10 pb-[209px]">
        <div className="flex items-center justify-center desktop:px-[120px] tablet:px-8 mobile:px-6">
          {renderEntireCardContent()}
        </div>
      </section>
    </div>
  );
};

export default EntirePage;
