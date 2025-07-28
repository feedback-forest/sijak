import { SaveTypingInfo } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션의 타입 정의
export interface TypingResultState {
  typingResultInfo: SaveTypingInfo | null;
  setTypingResultInfo: (typingResult: SaveTypingInfo) => void;
}

// 초기 상태 정의
const initialState: TypingResultState = {
  typingResultInfo: {
    nickname: "",
    role: "GUEST",
    rank: -1,
    luckyMessage: "",
  },
  setTypingResultInfo: () => {},
};

// Zustand 스토어 생성
const useTypingResultInfo = create(
  persist<TypingResultState>(
    (set) => ({
      ...initialState,
      setTypingResultInfo: (typingResult) =>
        set({
          typingResultInfo: {
            nickname: typingResult.nickname,
            role: typingResult.role,
            rank: typingResult.rank,
            luckyMessage: typingResult.luckyMessage,
          },
        }),
    }),
    {
      name: "typingResultInfo",
    },
  ),
);

export default useTypingResultInfo;
