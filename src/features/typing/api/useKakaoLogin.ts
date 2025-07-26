import { useQuery } from "@tanstack/react-query";
import { TYPING_USER_KEYS } from "@/shared/api/typingKeyFactory";
import { getKakaoLogin } from ".";
import { isEmpty } from "lodash";

const useKakaoLogin = (token: string) => {
  // console.log(token);
  return useQuery({
    queryKey: TYPING_USER_KEYS.lists(),
    queryFn: () => getKakaoLogin(token),
    select: (response) => response.data,
    // enabled: !isEmpty(token),
    meta: {
      errorMessage: "Failed to fetch kakao login",
    },
  });
};

export default useKakaoLogin;
