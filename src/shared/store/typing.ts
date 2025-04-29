/**
 * 
 *  - [ ]  CurrentTypingInfo 전역 객체: 현재 유저에 대한 정보, 문장에 대한 정보, 타이핑 연산 상태 관리 및 전역 상태 저장
    - [ ]  username
    - [ ]  title
    - [ ]  content
    - [ ]  writer
    - [ ]  cpm
    - [ ]  wpm
    - [ ]  acc
    - [ ]  time
 */

import { TypingInfo } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션의 타입 정의
export interface TypingState {
  typing: TypingInfo | null;
  setTypingInfo: (typingInfo: TypingInfo) => void;
}

// 초기 상태 정의
const initialState: TypingState = {
  typing: {
    username: "",
    title: "",
    content: "",
    writer: "",
    cpm: 0,
    wpm: 0,
    max_wpm: 0,
    acc: 100,
    time: "",
  },
  setTypingInfo: () => {},
};

// Zustand 스토어 생성
const useTypingStore = create(
  persist<TypingState>(
    (set) => ({
      ...initialState,
      setTypingInfo: (typingInfo) => set({ typing: typingInfo }),
    }),
    {
      name: "typingInfo",
    },
  ),
);

export default useTypingStore;
