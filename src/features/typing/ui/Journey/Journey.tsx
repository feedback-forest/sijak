"use client";

import { Result } from "../Result/Result";

import { useState } from "react";
import { TypeSlots } from "../TypeSlots/TypeSlots";
import { Sentences } from "../../model/typing";

const Step = {
  result: 1,
  typing: 0,
} as const;

type Step = (typeof Step)[keyof typeof Step];

export const Journey = ({
  phrase,
  phraseIndex,
}: {
  phrase: Sentences[];
  phraseIndex: number;
}) => {
  const [step, setStep] = useState<Step>(Step.typing);

  console.log("phrase", phrase);

  return (
    <>
      {step === Step.typing && (
        <TypeSlots phrase={phrase} phraseIndex={phraseIndex} />
      )}
      {step === Step.result && <Result onRetry={() => setStep(Step.typing)} />}
    </>
  );
};
