import { Phrase, Sentences } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션의 타입 정의
export interface PhraseState {
  tempToken: string | null;
  setTempToken: (token: string) => void;
}

// 초기 상태 정의
const initialState: PhraseState = {
  tempToken: "",
  setTempToken: () => {},
};

// Zustand 스토어 생성
const useTempTokenStore = create(
  persist<PhraseState>(
    (set) => ({
      ...initialState,
      setTempToken: (tempToken) => set({ tempToken: tempToken }),
    }),
    {
      name: "tempToken",
    },
  ),
);

export default useTempTokenStore;
