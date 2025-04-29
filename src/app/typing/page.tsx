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
import { Title } from "@/features/typing/ui/Title/Title";
// import { isMacOS } from "@/shared/hooks/userAgent.server";
import { getRandomPhrase, getRandomWords } from "@/shared/hooks/words";
import usePhraseStore from "@/shared/store/phrase";
import useLoginedUserStore from "@/shared/store/user";
import { Divider, Progress } from "@/shared/ui";
import { useEffect } from "react";

// const generateShortTexts = ({
//   roundCount,
//   wordCount,
// }: {
//   roundCount: number;
//   wordCount: number;
// }) => {
//   const shortTexts = [];

//   for (let i = 0; i < roundCount; i++) {
//     shortTexts.push(getRandomWords(wordCount).join(" "));
//   }

//   return shortTexts;
// };

const TypingHome = () => {
  // const quotes = generateShortTexts({
  //   roundCount: 5,
  //   wordCount: 10,
  // });

  // TODO: 유저 정보 확인 API
  // const { loginedUser: loginedUserState, setLoginedUser: setLoginedUserStore } =
  //   useLoginedUserStore();

  // const { loginedUser, setLoginedUser } = useLoginedUserStore();

  // FIXME: typing 유저 정보로 수정

  // const { data: loginUserData, isSuccess: isLoginUserSuccess } =
  //   useGetLoginUserInfo(loginedUser ? loginedUser.nickname : "");

  // TODO: 문장 랜덤 불러오기 API
  const randomPhrase = getRandomPhrase();
  // console.log(randomPhrase);
  // const { data: typingList, isSuccess: isTypingListSuccess } = useGetTypingList();

  // TODO: 문장 20개 recoil에 전역 상태관리
  const { phraseInfo, setPhraseInfo } = usePhraseStore();

  useEffect(() => {
    // if (isTypingListSuccess) {
    //  setPhraseInfo(typingList.data.phrase);
    if (randomPhrase) {
      setPhraseInfo(0, randomPhrase);
    }
    // }
  }, [randomPhrase]);

  useEffect(() => {
    console.log(phraseInfo);
  }, [phraseInfo]);
  // TODO: 다음 버튼 클릭 시 recoil 다음 문장 상태 가져오기

  // TODO: 경계값 1번째 글, 마지막 글 alert

  // TODO: 타이핑 문장 1개만 보이게 수정

  return (
    phraseInfo &&
    phraseInfo.phrase && (
      <div className="flex w-full h-full min-h-[calc(100vh_-_68px)] flex-col p-4">
        <TotalRecordProvider>
          <TypingStatusProvider>
            <OptionsProvider>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-9">
                  <Progress value={13} className="h-[1px]" />
                  <Journey isMacOS={false} phrase={phraseInfo.phrase} />
                  <Divider className="border-[#8D8D8D] mt-[2px]" />
                </div>
                {/* <PostTitle title={"새벽의 빛처럼"} author={"이지희"} /> */}
              </div>
              <FloatingBtnGroup />
            </OptionsProvider>
          </TypingStatusProvider>
        </TotalRecordProvider>
      </div>
    )
  );
};

export default TypingHome;
