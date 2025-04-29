"use client";

import useGetRealtimeRanking from "@/features/typing/api/useGetRealtimeRanking";
import RankingInfo from "@/features/typing/ui/RankingInfo/RankingInfo";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/Tabs/Tabs";

const RankingPage = () => {
  const rankingTempData = [
    {
      member_id: 45,
      rank: 1,
      nickname: "용갈이",
      score: 999,
    },
    {
      member_id: 15,
      rank: 2,
      nickname: "용갈",
      score: 900,
    },
    {
      member_id: 32,
      rank: 3,
      nickname: "키키",
      score: 821,
    },
    {
      member_id: 33,
      rank: 4,
      nickname: "타자쟁이",
      score: 870,
    },
    {
      member_id: 34,
      rank: 5,
      nickname: "귀여운거북이",
      score: 804,
    },
    {
      member_id: 35,
      rank: 6,
      nickname: "지금 이 순간",
      score: 789,
    },
    {
      member_id: 36,
      rank: 7,
      nickname: "최미꾸라지",
      score: 720,
    },
    {
      member_id: 37,
      rank: 8,
      nickname: "용맹한 호랑이",
      score: 456,
    },
    {
      member_id: 38,
      rank: 9,
      nickname: "기분좋은누렁이",
      score: 387,
    },
    {
      member_id: 39,
      rank: 10,
      nickname: "윤망치",
      score: 340,
    },
  ];

  const { data: realtimeRankingData } = useGetRealtimeRanking();
  const realtimeRanking = realtimeRankingData;
  console.log(realtimeRanking);

  return (
    <div className="flex w-full min-h-[calc(100vh_-_68px)] px-4">
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="w-full p-0 h-10 border border-black rounded-none bg-white">
          <TabsTrigger
            value="realtime"
            className="w-full h-10 outline-none rounded-none p-0 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow"
          >
            실시간
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="w-full h-10 outline-none rounded-none p-0 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow"
          >
            월별
          </TabsTrigger>
        </TabsList>
        <TabsContent value="realtime">
          <section className="flex flex-col w-full pt-[18px]">
            {realtimeRanking &&
              realtimeRanking.map((rankData) => {
                return (
                  <RankingInfo
                    key={rankData.member_id}
                    memberId={rankData.member_id}
                    rank={rankData.rank}
                    nickname={rankData.nickname}
                    score={rankData.score}
                  />
                );
              })}
          </section>
        </TabsContent>
        <TabsContent value="monthly">
          <section className="flex flex-col w-full pt-[18px]">
            {rankingTempData.map((rankData) => {
              return (
                <RankingInfo
                  key={rankData.member_id}
                  memberId={rankData.member_id}
                  rank={rankData.rank}
                  nickname={rankData.nickname}
                  score={rankData.score}
                />
              );
            })}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankingPage;
