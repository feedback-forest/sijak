"use client";

import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import {
  OptionsProvider,
  OptionsSelector,
} from "@/features/provider/OptionsProvider";
import { TotalRecordProvider } from "@/features/provider/TotalRecordProvider";
import { TypingStatusProvider } from "@/features/provider/TypingStatusProvider";
import useGetTypingList from "@/features/typing/api/useGetTypingList";
import FloatingBtnGroup from "@/features/typing/ui/FloatingBtnGroup/FloatingBtnGroup";
import { Journey } from "@/features/typing/ui/Journey/Journey";
import PostTitle from "@/features/typing/ui/PostTitle/PostTitle";
import TypingProgressBar from "@/features/typing/ui/TypingProgressBar/TypingProgressBar";
// import { isMacOS } from "@/shared/hooks/userAgent.server";
import { getRandomPhrase } from "@/shared/hooks/words";
import usePhraseStore from "@/shared/store/phrase";
import useTypingStore from "@/shared/store/typing";
import useTypingPercent from "@/shared/store/typingPercent";
import useTypingLoginedUserStore from "@/shared/store/typingUser";
import { Divider, Progress } from "@/shared/ui";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const TypingHome = () => {
  // TODO: 유저 정보 확인 API
  const { typingLoginedUser } = useTypingLoginedUserStore();

  // useEffect(() => {
  //   console.log("✅ 로그인 유저 상태:", typingLoginedUser);
  // }, [typingLoginedUser]);

  const {
    data: typingList,
    isLoading,
    isSuccess: isTypingListSuccess,
  } = useGetTypingList();

  const typingListData = typingList?.data.phrases;
  // console.log("typingListData", typingListData);

  const { phraseInfo, setPhrase } = usePhraseStore();

  useEffect(() => {
    if (typingListData && phraseInfo && typingListData.length > 0) {
      // console.log("1234", typingListData);
      setPhrase(typingListData);
    }
  }, [typingListData]);

  // useEffect(() => {
  //   console.log(phraseInfo);
  // }, [phraseInfo]);

  if (isLoading || !phraseInfo || phraseInfo.phrase.length === 0) {
    return (
      <div className="flex w-full h-full min-h-[calc(100vh_-_68px)] justify-center items-center">
        <ClipLoader color="#8D8D8D" size={24} />
      </div>
    );
  }

  return (
    phraseInfo.phrase && (
      <div className="flex w-full h-full min-h-[calc(100vh_-_68px)] flex-col p-4">
        <TotalRecordProvider>
          <TypingStatusProvider>
            <OptionsProvider>
              <div className="flex h-full flex-col gap-5">
                <div className="flex h-full flex-col gap-9">
                  <TypingProgressBar />
                  {isLoading && (
                    <div className="flex w-full justify-center items-center">
                      <ClipLoader color="#8D8D8D" size={24} />
                    </div>
                  )}
                  {phraseInfo && phraseInfo.phrase && (
                    <Journey
                      phrase={phraseInfo.phrase}
                      phraseIndex={phraseInfo.phraseIndex}
                    />
                  )}
                  <Divider className="border-[#8D8D8D] mt-[2px]" />
                </div>

                <div className="flex w-full px-1">
                  <PostTitle
                    title={
                      phraseInfo.phrase[phraseInfo.phraseIndex]
                        ? phraseInfo.phrase[phraseInfo.phraseIndex].title
                        : ""
                    }
                    author={
                      phraseInfo.phrase[phraseInfo.phraseIndex]
                        ? phraseInfo.phrase[phraseInfo.phraseIndex].author
                        : ""
                    }
                  />
                </div>
              </div>
            </OptionsProvider>
          </TypingStatusProvider>
        </TotalRecordProvider>
      </div>
    )
  );
};

export default TypingHome;
