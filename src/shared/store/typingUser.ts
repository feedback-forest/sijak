import { TypingLoginUserInfo } from "@/features/typing/model/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상태와 액션의 타입 정의
export interface TypingLoginedUserState {
  typingLoginedUser: TypingLoginUserInfo | null; // LoginUserInfo 타입을 사용
  setTypingLoginedUser: (loginedUserInfo: TypingLoginUserInfo) => void;
}

// // 초기 상태 정의
// const initialState: TypingLoginedUserState = {
//   loginedUser: {
//     accessToken: "",
//     refreshToken: "",
//   },
//   setLoginedUser: () => {},
// };

// // Zustand 스토어 생성
// const useTypingLoginedUserStore = create(
//   persist<TypingLoginedUserState>(
//     (set) => ({
//       ...initialState,
//       setLoginedUser: (loginedUserInfo) =>
//         set({ loginedUser: loginedUserInfo }),
//     }),
//     {
//       name: "typingLoginedUserInfo",
//     },
//   ),
// );

import { devtools } from "zustand/middleware";

const useTypingLoginedUserStore = create(
  devtools(
    persist<TypingLoginedUserState>(
      (set) => ({
        typingLoginedUser: {
          accessToken: "",
          refreshToken: "",
        },
        setTypingLoginedUser: (loginedUserInfo) =>
          set({ typingLoginedUser: loginedUserInfo }),
      }),
      {
        name: "typingLoginedUserInfo",
      },
    ),
    { name: "TypingLoginedUserStore" },
  ),
);

export default useTypingLoginedUserStore;

export const typingUserStore = useTypingLoginedUserStore;
