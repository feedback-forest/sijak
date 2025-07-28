import { Phrase, Sentences } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션의 타입 정의
export interface PhraseState {
  phraseInfo: Phrase | null;
  setPhrase: (phrase: Sentences[], resetIndex?: boolean) => void;
  setPhraseIndex: (index: number) => void;
}

// 초기 상태 정의
const initialState: PhraseState = {
  phraseInfo: {
    phraseIndex: 0,
    phrase: [
      // {
      //   id: 0,
      //   sentence: "",
      //   title: "",
      //   author: "",
      //   nickname: "",
      //   lang: "",
      //   types: "",
      //   user_id: 0,
      // },
    ],
  },
  setPhrase: () => {},
  setPhraseIndex: () => {},
};

// Zustand 스토어 생성
const usePhraseStore = create(
  persist<PhraseState>(
    (set, get) => ({
      phraseInfo: {
        phraseIndex: 0,
        phrase: [],
      },
      setPhrase: (phrase, resetIndex = false) => {
        const currentIndex = get().phraseInfo?.phraseIndex ?? 0;
        set({
          phraseInfo: {
            phraseIndex: resetIndex ? 0 : currentIndex,
            phrase,
          },
        });
      },
      setPhraseIndex: (index) => {
        const current = get().phraseInfo;
        if (!current) return;

        set({
          phraseInfo: {
            ...current,
            phraseIndex: index,
          },
        });
      },
    }),
    {
      name: "phraseInfo",
    },
  ),
);

export default usePhraseStore;
