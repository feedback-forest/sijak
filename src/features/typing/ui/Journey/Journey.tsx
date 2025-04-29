"use client";

import { Result } from "../Result/Result";

import { useState } from "react";
import { TypeSlots } from "../TypeSlots/TypeSlots";
import { Sentences } from "../../model/typing";

const Step = {
  결과: 1,
  타이핑: 0,
} as const;

type Step = (typeof Step)[keyof typeof Step];

export const Journey = ({
  phrase,
  isMacOS,
}: {
  phrase: Sentences[];
  isMacOS: boolean;
}) => {
  const [step, setStep] = useState<Step>(Step.타이핑);

  return (
    <>
      {step === Step.타이핑 && (
        <TypeSlots
          isMacOS={isMacOS}
          phrase={phrase}
          onComplete={() => setStep(Step.결과)}
        />
      )}
      {step === Step.결과 && <Result onRetry={() => setStep(Step.타이핑)} />}
    </>
  );
};
