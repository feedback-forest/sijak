import { TypingPercent } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션의 타입 정의
export interface TypingPercentState {
  typingPercent: TypingPercent | null;
  setTypingPercent: (typingPercent: number) => void;
}

// 초기 상태 정의
const initialState: TypingPercentState = {
  typingPercent: {
    percent: 0,
  },
  setTypingPercent: () => {},
};

// Zustand 스토어 생성
const useTypingPercent = create(
  persist<TypingPercentState>(
    (set) => ({
      ...initialState,
      setTypingPercent: (typingPercent: number) =>
        set({
          typingPercent: {
            percent: typingPercent,
          },
        }),
    }),
    {
      name: "typingPercent",
    },
  ),
);

export default useTypingPercent;
