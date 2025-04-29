import apiRequest from "@/shared/api";
import { GetSentencesInfo, SaveTyping } from "../model/typing";
import { GetMonthlyRanking, GetRealtimeRanking } from "../model/ranking";
import {
  GetTypingRandomNickname,
  PostTypingMemberNickname,
  ValidateTypingNickname,
} from "../model/members";

const MEMBER_BASE_PATH = "api/v1/members/nickname";
const TYPING_BASE_PATH = "/api/v1/typings";
const RANKING_BASE_PATH = "/api/v1/rankings";

export const postTypingMemberNickname = (
  payload: PostTypingMemberNickname["Request"]["body"],
) =>
  apiRequest.post<PostTypingMemberNickname["Response"]>(
    `${MEMBER_BASE_PATH}`,
    payload,
    // {
    //   headers: { Authorization: `` },
    // },
  );

export const getTypingRandomNickname = () =>
  apiRequest.get<GetTypingRandomNickname["Response"]>(
    `${MEMBER_BASE_PATH}/random`,
    {},
  );

export const validateNickname = (
  payload: ValidateTypingNickname["Request"]["body"],
) =>
  apiRequest.post<ValidateTypingNickname["Response"]>(
    `${MEMBER_BASE_PATH}/validate`,
    payload,
    {
      // headers: {
      //   Authorization: `Bearer ${getCookie("accessToken")}`,
      // },
    },
  );

export const getTypingList = () => {
  return apiRequest.get<GetSentencesInfo>(`${TYPING_BASE_PATH}`, {
    // headers: {
    //   Authorization: ``,
    // },
  });
};

export const saveTypingInfo = (payload: SaveTyping["Request"]["body"]) =>
  apiRequest.post<SaveTyping["Response"]>(`${TYPING_BASE_PATH}`, payload, {
    // headers: {
    //   Authorization: ``,
    // },
  });

export const getRealtimeRanking = () =>
  apiRequest.get<GetRealtimeRanking["data"]>(`${RANKING_BASE_PATH}/realtime`, {
    // headers: {
    //   Authorization: ``,
    // },
  });

export const getMonthlyRanking = () =>
  apiRequest.get<GetMonthlyRanking>(`${RANKING_BASE_PATH}/monthly`, {
    // headers: {
    //   Authorization: ``,
    // },
  });
