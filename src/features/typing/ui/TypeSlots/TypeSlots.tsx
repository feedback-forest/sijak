import { useEffect, useRef, useState } from "react";
import { Record, RecordProvider } from "../Record/Record";
import { TypeArea } from "../TypeArea/TypeArea";
import { Progress } from "../Progress/Progress";
import { useTypingStatus } from "@/features/provider/TypingStatusProvider";
import { Sentences } from "../../model/typing";
import FloatingBtnGroup from "../FloatingBtnGroup/FloatingBtnGroup";

interface TypeSlotsProps {
  phrase: Sentences[];
  phraseIndex: number;
}

export const TypeSlots = ({ phrase, phraseIndex }: TypeSlotsProps) => {
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  // console.log(phrase);

  const currentSentence = phrase[phraseIndex]?.sentence ?? "";
  // console.log(currentSentence);

  return (
    <div className="flex content-center items-center px-8 transition-transform duration-700">
      <div className="mx-auto w-full max-w-4xl">
        {/* FIXME: UI 및 컴포턴트 구조 수정 필요 */}
        <RecordProvider target={currentSentence} key={phraseIndex}>
          <TypeArea
            text={currentSentence}
            phraseInfo={phrase[phraseIndex]}
            phrase={phrase}
            phraseIndex={phraseIndex}
          />
        </RecordProvider>
      </div>
    </div>
  );
};
