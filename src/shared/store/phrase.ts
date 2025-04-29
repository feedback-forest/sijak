import { Phrase, Sentences } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션의 타입 정의
export interface PhraseState {
  phraseInfo: Phrase | null;
  setPhraseInfo: (phraseIndex: number, phrase: Sentences[]) => void;
}

// 초기 상태 정의
const initialState: PhraseState = {
  phraseInfo: {
    phraseIndex: 0,
    phrase: [],
  },
  setPhraseInfo: () => {},
};

// Zustand 스토어 생성
const usePhraseStore = create(
  persist<PhraseState>(
    (set) => ({
      ...initialState,
      setPhraseInfo: (phraseIndex, phrase) =>
        set({ phraseInfo: { phraseIndex, phrase } }),
    }),
    {
      name: "phraseInfo",
    },
  ),
);

export default usePhraseStore;
