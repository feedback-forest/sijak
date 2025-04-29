export interface Ranking {
  member_id: number;
  rank: number;
  nickname: string;
  score: number;
}

export interface GetRealtimeRankingRes {
  ranking: Ranking[];
}

export interface GetRealtimeRanking {
  code: number;
  message: string;
  // GetRealtimeRankingRes
  data: Ranking[];
}

export interface GetMonthlyRankingRes {
  ranking: Ranking[];
}

export interface GetMonthlyRanking {
  code: number;
  message: string;
  data: GetMonthlyRankingRes;
}
