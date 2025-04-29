import { useEffect, useRef, useState } from "react";
import { Record, RecordProvider } from "../Record/Record";
import { TypeArea } from "../TypeArea/TypeArea";
import { Progress } from "../Progress/Progress";
import { useTypingStatus } from "@/features/provider/TypingStatusProvider";
import { Sentences } from "../../model/typing";

interface TypeSlotsProps {
  phrase: Sentences[];
  isMacOS: boolean;
  onComplete: () => void;
}

export const TypeSlots = ({ phrase, isMacOS, onComplete }: TypeSlotsProps) => {
  const typeAreaRefList = useRef<(HTMLTextAreaElement | null)[]>(
    new Array(phrase.length).fill(null),
  );

  const [focusedIndex, setFocusedIndex] = useState(0);
  const { forceTypeEnd } = useTypingStatus();

  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  console.log(phrase);

  return (
    <div
      // key={`${quote}${index}`}
      className="flex content-center items-center px-8 transition-transform duration-700"
      // style={{
      //   transform: `translateY(calc(${focusedIndex - index} * -100vh))`,
      // }}
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* FIXME: UI 및 컴포턴트 구조 수정 필요 */}
        <RecordProvider target={phrase[0].sentence}>
          {/* <div className="flex items-center justify-between">
            <Record target={quote} />
            <Progress current={index + 1} total={quotes.length} />
          </div> */}
          <TypeArea
            // ref={(element) => {
            //   typeAreaRefList.current[index] = element;
            // }}
            // disabled={index !== focusedIndex}
            // autoFocus={index === 0}
            // onComplete={() => {
            // const nextElement = typeAreaRefList.current[index + 1];

            //   if (nextElement) {
            //     setFocusedIndex((prev) => prev + 1);

            //     setTimeout(() => {
            //       const focus = () => {
            //         const isDisabled = nextElement.getAttribute("disabled");

            //         if (!isDisabled) {
            //           nextElement.focus();
            //           return;
            //         }

            //         frameRef.current = requestAnimationFrame(focus);
            //       };

            //       frameRef.current = requestAnimationFrame(focus);
            //     }, 150);
            //   } else {
            //     setFocusedIndex((prev) => prev + 1);

            //     setTimeout(() => {
            //       forceTypeEnd();
            //       onComplete();
            //     }, 600);
            //   }
            // }}
            // isMacOS={isMacOS}
            text={phrase[0].sentence}
          />
        </RecordProvider>
      </div>
    </div>
  );
  // quotes.map((quote, index) => (내부에 div 있었음)
};
