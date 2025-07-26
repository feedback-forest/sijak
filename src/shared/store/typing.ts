import { TypingInfo } from "@/features/typing/model/typing";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface TypingState {
  typing: TypingInfo;
  setTypingInfo: (typingInfo: Partial<TypingInfo>) => void;
}

const initialTypingInfo: TypingInfo = {
  username: "",
  title: "",
  content: "",
  writer: "",
  cpm: 0,
  maxCpm: 0,
  wpm: 0,
  acc: 1,
  time: "",
};

const useTypingStore = create<TypingState>()(
  devtools(
    persist(
      (set, get) => ({
        typing: initialTypingInfo,
        setTypingInfo: (newInfo) => {
          const prev = get().typing;
          const next = { ...prev, ...newInfo };
          set({ typing: next });
        },
      }),
      {
        name: "typingInfo", // localStorage에 저장될 이름
      },
    ),
    { name: "TypingStore" }, // Redux DevTools에 표시될 스토어 이름
  ),
);

export default useTypingStore;
