import { Payload } from "@/shared/model/api";

export interface TypingInfo {
  username: string;
  title: string;
  content: string;
  writer: string;
  cpm: number;
  wpm: number;
  max_wpm: number;
  acc: number;
  time: string;
}

export interface Sentences {
  id: number;
  sentence: string;
  title: string;
  author: string;
  nickname: string;
  lang: string;
  types: string;
  user_id: number;
}

export interface GetSentencesInfo {
  phrase: Sentences[];
}

export interface GetSentences {
  code: number;
  message: string;
  data: GetSentencesInfo;
}

export interface Typing {
  id: number;
  cpm: number;
  wpm: number;
  max_wpm: number;
  acc: number;
}

export interface SaveTypingDto {
  // lang: "ko" | "en";
  typing: Typing;
}

export interface SaveTypingResData {
  rank: number;
  lucky_message: string;
}

export interface SaveTypingRes {
  code: number;
  message: string;
  data: SaveTypingResData;
}

export type SaveTyping = Payload<
  undefined,
  undefined,
  SaveTypingDto,
  SaveTypingRes
>;
