"use client";

import {
  BackToPrevious,
  Button,
  Checkbox,
  Label,
  UnifiedDialog,
} from "@/shared/ui";
import { Controller, useForm } from "react-hook-form";
import {
  HeartsLectureListResDataInfo,
  LikeLectureParams,
} from "@/features/like/model/like";
import {
  LectureList,
  NotFoundLecture,
  SkeletonCard,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import Paginator from "@/shared/ui/Pagination/Paginator";
import useDeleteDeactivatesLikeLecture from "@/features/like/api/useDeleteDeactivatesLikeLecture";
// import { useInView } from "react-intersection-observer";
import useLikeLectureList from "@/features/like/api/useLikeLectureList";
import { useToast } from "@/shared/hooks/useToast";

const LikePage = () => {
  const [lectureListData, setLectureListData] = useState<
    HeartsLectureListResDataInfo[]
  >([]);
  const [likeLectureParams, setLikeLectureParams] = useState<LikeLectureParams>(
    {
      page: 0,
      size: 9,
      mode: true,
    },
  );
  // const [hasNext, setHasNext] = useState(true);

  const [openDeleteLectureDialog, setOpenDeleteLectureDialog] =
    useState<boolean>(false);

  const { toast } = useToast();

  const { control, watch } = useForm({
    defaultValues: {
      onlyCanApply: likeLectureParams.mode,
    },
  });

  // const { ref, inView } = useInView({
  //   threshold: 1.0, // 100% 보일 때 트리거
  // });

  const { data, isLoading, isSuccess } = useLikeLectureList({
    page: likeLectureParams.page,
    size: likeLectureParams.size,
    mode: likeLectureParams.mode,
  });

  const deleteDeactivatesLecture = useDeleteDeactivatesLikeLecture();

  const onlyCanApply = watch("onlyCanApply");

  const deleteDeactivatesLectures = () => {
    if (data?.data.data.some((lecture) => lecture.status === false)) {
      deleteDeactivatesLecture.mutate(undefined, {
        onSuccess: () => {
          toast({ title: "마감된 찜 클래스가 삭제됐어요." });
          setOpenDeleteLectureDialog(false);
        },
      });
    } else {
      toast({ title: "마감된 찜 클래스가 없어요." });
      setOpenDeleteLectureDialog(false);
    }
  };

  // FIXME: 수정
  // useEffect(() => {
  //   if (isSuccess) {
  //     if (likeLectureParams.page > 0) {
  //       setLectureListData((prev) => {
  //         const newData = data.data.data;
  //         const uniqueData = [...prev, ...newData].filter(
  //           (lecture, index, self) =>
  //             index === self.findIndex((l) => l.id === lecture.id),
  //         );
  //         return uniqueData;
  //       });
  //     } else {
  //       setLectureListData(data.data.data);
  //     }
  //     setHasNext(data.data.hasNext);
  //   }
  // }, [data, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setLectureListData(data.data.data);
      // setHasNext(data.data.hasNext);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    setLikeLectureParams((prev) => ({
      ...prev,
      mode: !!onlyCanApply,
      page: 0,
    }));
  }, [onlyCanApply]);

  // useEffect(() => {
  //   if (inView && hasNext && !isLoading) {
  //     setLikeLectureParams((prev) => {
  //       return {
  //         ...prev,
  //         page: prev.page + 1,
  //       };
  //     });
  //   }
  // }, [inView, hasNext, isLoading]);

  const triggerItem = () => {
    return (
      <div className="flex justify-center items-center desktop:w-[183px] tablet:w-[183px] mobile:w-20  desktop:h-11 tablet:h-11 mobile:h-8 bg-white text-custom-textBlackColor hover:bg-white hover:font-semibold hover:text-custom-hoverPurple rounded-sm border border-custom-disabled">
        <div className="desktop:flex tablet:flex mobile:hidden">
          마감된 클래스 삭제하기
        </div>
        <div className="desktop:hidden tablet:hidden mobile:flex">
          마감 삭제
        </div>
      </div>
    );
  };

  const dialogContent = () => {
    return (
      <div className="flex flex-col items-center justify-center desktop:pt-[35px] tablet:pt-[34px] mobile:pt-[34px] desktop:gap-[49px] tablet:gap-[34px] mobile:gap-[34px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-semibold">마감된 클래스를</div>
            <div className="text-xl font-semibold">삭제 하시겠습니까?</div>
          </div>
          <div className="text-base">*삭제 시 복구가 불가능합니다.</div>
        </div>
        <div className="flex flex-row gap-2.5">
          <div>
            <Button
              variant="outline"
              className="w-[125px] h-[52px] text-base font-semibold shadow-none"
              onClick={() => setOpenDeleteLectureDialog(false)}
            >
              취소
            </Button>
          </div>
          <div>
            <Button
              className="w-[125px] h-[52px] bg-custom-purple hover:bg-custom-hoverPurple text-base font-semibold shadow-none"
              onClick={deleteDeactivatesLectures}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderLikeCardContent = () => {
    if (lectureListData && lectureListData.length > 0) {
      return (
        <div>
          <LectureList lectureListData={lectureListData} type="pickLecture" />
          {/* <div ref={ref} className="desktop:h-6 tablet:h-4 mobile:h-9" /> */}
          {isLoading && (
            <div className="flex desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9">
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
        <div className="flex flex-col gap-2">
          <div className="h-9" />
          <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 desktop:gap-6 tablet:gap-4 mobile:gap-9">
            <SkeletonCard type="pickLecture" />
            <SkeletonCard type="pickLecture" />
            <SkeletonCard type="pickLecture" />
          </div>
        </div>
      );
    }

    return (
      <NotFoundLecture
        description="아직 찜한 클래스가 없습니다."
        subDescription="마음에 드는 강좌를 찾아 찜해보세요!"
        isHideIcon
      />
    );
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh_-_208px)] justify-start items-center desktop:pt-20 tablet:pt-10 mobile:pt-10 bg-custom-homeMapBackground relative">
      <div className="desktop:hidden tablet:flex mobile:hidden absolute top-10 left-4">
        <BackToPrevious />
      </div>
      <section className="desktop:flex tablet:flex mobile:hidden flex-row w-full h-12 items-start justify-center">
        <div className="flex flex-row gap-3">
          <h1 className="desktop:flex tablet:flex mobile:hidden text-custom-textBlackColor desktop:text-[32px] tablet:text-[28px] mobile:text-base">
            내가 찜한 클래스 리스트
          </h1>
        </div>
      </section>
      <section className="flex flex-col w-full desktop:pt-0 tablet:pt-10 pb-[209px] gap-20">
        <div className="flex  flex-col gap-4">
          <div className="flex  justify-between desktop:px-[120px] tablet:px-8 mobile:px-6">
            <div className="flex flex-row items-center gap-2">
              <Controller
                name="onlyCanApply"
                control={control}
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  // FIXME: 로직 확인 필요 - 멘토님 도움 필요
                  <Checkbox
                    id="onlyCanApply"
                    className="w-6 h-6"
                    checked={value}
                    onCheckedChange={(checked) => {
                      onChange(checked);
                      setLikeLectureParams((prev) => ({
                        ...prev,
                        mode: !!checked,
                        page: 0,
                      }));
                    }}
                    onBlur={onBlur}
                    ref={ref}
                  />
                )}
              />
              <Label
                htmlFor="onlyCanApply"
                className="text-base text-custom-textBlackColor"
              >
                <div className="desktop:flex tablet:flex mobile:hidden">
                  신청 가능한 클래스만 보기
                </div>
                <div className="desktop:hidden tablet:hidden mobile:flex">
                  신청 가능만 보기
                </div>
              </Label>
            </div>
            <UnifiedDialog
              open={openDeleteLectureDialog}
              setOpen={setOpenDeleteLectureDialog}
              triggerItem={triggerItem()}
              dialogTitle="로그아웃 다이얼로그"
              dialogDescription="로그아웃 확인 다이얼로그"
              dialogContent={dialogContent()}
            />
          </div>
          <div className="flex items-center justify-center desktop:px-[120px] tablet:px-8 mobile:px-6">
            {renderLikeCardContent()}
          </div>
        </div>
        {lectureListData && (
          <Paginator
            currentPage={likeLectureParams.page + 1}
            totalPages={data?.data.totalPage ?? 10}
            onPageChange={(pageNumber) =>
              setLikeLectureParams((prev) => {
                return { ...prev, page: pageNumber - 1 };
              })
            }
            showPreviousNext
          />
        )}
      </section>
    </div>
  );
};

export default LikePage;
