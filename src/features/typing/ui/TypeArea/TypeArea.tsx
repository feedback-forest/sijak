"use client";

import clsx from "clsx";
import Hangul from "hangul-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecord } from "../Record/Record";
import { useTotalRecord } from "@/features/provider/TotalRecordProvider";
import { ResetButton } from "../ResetButton/ResetButton";
import { useTypingStatus } from "@/features/provider/TypingStatusProvider";
import { useToast } from "@/shared/hooks/useToast";
import FloatingBtnGroup from "../FloatingBtnGroup/FloatingBtnGroup";
import { useRouter } from "next/navigation";
import useTypingStore from "@/shared/store/typing";
import { Sentences } from "../../model/typing";
import useSaveTypingInfo from "../../api/useSaveTypingInfo";
import usePhraseStore from "@/shared/store/phrase";
import useTypingResultInfo from "@/shared/store/typingResult";
import useTypingPercent from "@/shared/store/typingPercent";
import useTypingLoginedUserStore from "@/shared/store/typingUser";

const ENGLISH_REGEX = /[a-zA-Z]/;

export const TypeArea = React.forwardRef(function TypeAreaForward(
  {
    text,
    phraseInfo,
    phrase,
    phraseIndex,
    disabled,
    autoFocus,
    isMacOS,
    onComplete,
  }: {
    text: string;
    phraseInfo: Sentences;
    phrase: Sentences[];
    phraseIndex: number;
    disabled?: boolean;
    autoFocus?: boolean;
    isMacOS?: boolean;
    onComplete?: () => void;
  },
  ref: React.Ref<HTMLTextAreaElement>,
) {
  const innerRef = useRef<HTMLTextAreaElement>();

  const { typing } = useTypingStatus();

  const {
    updateRecord,
    resolvedCharList,
    resetRecord,
    wordsPerMinute,
    maxCPM,
    characterPerMinute,
    accuracy,
    time,
  } = useRecord();

  const [typedValue, setTypedValue] = useState<string>("");
  const [isReadyToComplete, setIsReadyToComplete] = useState(false);

  const { typing: typingInfo, setTypingInfo } = useTypingStore();
  const { typingLoginedUser } = useTypingLoginedUserStore();
  const { setTypingResultInfo } = useTypingResultInfo();
  const { updateTotalRecord } = useTotalRecord();
  const saveTypingInfo = useSaveTypingInfo(
    typingLoginedUser?.accessToken ?? "",
  );

  const { toast } = useToast();
  const router = useRouter();

  const reset = useCallback(() => {
    setTypedValue("");
    resetRecord();
    setIsReadyToComplete(false);

    const textareaElement = innerRef.current;

    if (textareaElement) {
      textareaElement.focus();
    }
  }, [resetRecord]);

  const complete = useCallback(() => {
    if (!isReadyToComplete) {
      return;
    }

    updateTotalRecord({
      accuracy,
      characterPerMinute,
      maxCPM,
      wordsPerMinute,
    });

    saveTypingInfo.mutate(
      {
        // TODO: id
        phraseId: 1,
        cpm: characterPerMinute,
        wpm: wordsPerMinute,
        maxCpm: maxCPM,
        acc: accuracy,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setTypingResultInfo({
            nickname: data.data.data.typing.nickname,
            rank: data.data.data.typing.rank,
            luckyMessage: data.data.data.typing.luckyMessage,
            role: data.data.data.typing.role,
          });
        },
      },
    );

    const newTypingInfo = {
      username: typingInfo?.username ?? [],
      title: phraseInfo.title,
      content: phraseInfo ? phraseInfo.sentence : "",
      writer: phraseInfo ? phraseInfo.author : "",
      cpm: characterPerMinute,
      maxCpm: maxCPM,
      wpm: wordsPerMinute,
      acc: accuracy,
      time,
    };

    setTypingInfo(newTypingInfo);

    onComplete?.();
  }, [
    isReadyToComplete,
    updateTotalRecord,
    accuracy,
    characterPerMinute,
    maxCPM,
    wordsPerMinute,
    typingInfo?.username,
    typingInfo?.title,
    typingInfo?.content,
    typingInfo?.writer,
    time,
    setTypingInfo,
    onComplete,
  ]);

  //FIXME: 수정한 곳
  // useEffect(() => {
  //   setTypingPercent({
  //     percent: typedValue.length / phraseInfo.sentence.length,
  //   });
  // }, [phraseInfo.sentence.length, setTypingPercent, typedValue]);

  console.log(
    `cpm: ${characterPerMinute}, maxCPM: ${maxCPM}, wpm: ${wordsPerMinute}, acc: ${accuracy}, time: ${time}, percent: ${typedValue.length / phraseInfo?.sentence.length}`,
  );

  console.log();

  return (
    <>
      <div className="relative text-xl leading-[33px] sm:text-2xl md:text-3xl md:leading-normal h-full">
        <textarea
          ref={(element) => {
            if (element) {
              innerRef.current = element;
              if (typeof ref === "function") {
                ref(element);
              }
            }
          }}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoSave="off"
          autoFocus={autoFocus}
          className="absolute inset-0 resize-none overflow-hidden bg-transparent text-transparent caret-slate-300 selection:bg-orange-100 selection:bg-opacity-30 focus:border-none focus:outline-none"
          disabled={disabled}
          onChange={(event) => {
            const value = event.currentTarget.value;

            if (
              isReadyToComplete ||
              value.length > text.length ||
              (!isReadyToComplete && value.includes("\n"))
            ) {
              return;
            }

            typing();

            if (ENGLISH_REGEX.test(value) && value !== "") {
              toast({ title: "한글을 입력해주세요." });
              return;
            }

            setTypedValue(value);
            updateRecord(value);

            if (
              value.length === text.length &&
              (value[value.length - 1] === text[text.length - 1] ||
                (Hangul.isComplete(value[value.length - 1]) &&
                  Hangul.disassemble(value[value.length - 1]).length === 3))
            ) {
              setIsReadyToComplete(true);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              complete();
              router.push("/typing/result");
            }
          }}
          value={typedValue}
        />
        <p>
          {resolvedCharList.map(({ char, typedChar, isCorrect }, index) => (
            <span
              key={`${index}${char}`}
              className={clsx(
                typedChar
                  ? isCorrect
                    ? "text-[#000]"
                    : "text-red-500"
                  : "text-[#BEBEBE]",
              )}
            >
              {typedChar ?? char}
            </span>
          ))}
        </p>
      </div>
      <FloatingBtnGroup reset={reset} />
    </>
  );
});
