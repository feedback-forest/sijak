import FloatingBtnGroup from "@/features/typing/ui/FloatingBtnGroup/FloatingBtnGroup";
import ResultInfo from "@/features/typing/ui/ResultInfo/ResultInfo";
import { Divider } from "@/shared/ui";
import Image from "next/image";

const ResultPage = () => {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh_-_68px)] px-4 gap-10">
      <section className="flex flex-col items-center justify-center gap-1.5">
        <div className="text-[32px] font-black">write.type</div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-[10px] font-medium text-custom-textTypingGrayColor">
            transcribe every day, get better every day.
          </div>
          <div className="text-[10px] font-medium text-custom-textTypingGrayColor">
            https://www.sijak.com/typing
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="absolute right-0 -top-[44px]">
          <Image
            src="/icons/star_outline.svg"
            alt="star_outline"
            width={88}
            height={88}
          />
          <div className="absolute top-[30px] left-[18px] rotate-[-15deg]">
            <div className="text-[10px] text-custom-textTypingGreenColor">
              2025-12-31
            </div>
            <div className="text-[10px] text-custom-textTypingGreenColor">
              16:40:24
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[14px]">
            <ResultInfo title="User" content="김타자" />
            <Divider isDashed />
            {/* TODO: 회원만 보여주고 비회원 blur 처리 로그인한 회원만 볼 수 있습니다. */}
            <ResultInfo title="Rank" content="1위" />
            <Divider isDashed />
            <div className="flex flex-row w-full items-center gap-[60px]">
              <ResultInfo
                title="CPM"
                content="332"
                containerClassName="w-[105px]"
                contentClassName="text-[28px]"
              />
              <ResultInfo
                title="WPM"
                content="66"
                contentClassName="text-[28px]"
              />
            </div>
            <div className="flex flex-row w-full items-center gap-[60px]">
              <ResultInfo
                title="ACC"
                content="100"
                containerClassName="w-[105px]"
                contentClassName="text-[28px]"
              />
              <ResultInfo
                title="TIME"
                content="00:00:00"
                contentClassName="text-[28px]"
              />
            </div>
            <Divider isDashed />
            <ResultInfo title="Title" content="새벽의 빛처럼" />
            <Divider isDashed />
            <ResultInfo title="Writer" content="이지희" />
            <Divider isDashed />
          </div>
          <div>
            <div>
              길이 보이지 않을 때, 새벽이 오듯 기회도 찾아온다. 오늘 내딛은 작은
              걸음이 내일을 밝히는 빛이 된다. 어둠이 깊어질수록 새벽은
              가까워진다. 천천히 나아가는 것도 충분히 의미가 있다. 중요한 것은
              멈추지 않는 것이다. 지금의 모든 순간은 결국 의미가 되어 돌아온다.
            </div>
          </div>
          <Divider isDashed />
        </div>
      </section>
      <div className="flex flex-col items-center justify-center">
        <div className="font-medium text-[12px] text-custom-textTypingGrayColor">
          오늘도 좋은 하루 되세요!
        </div>
        <div className="font-medium text-[12px] text-custom-textTypingGrayColor">
          *오늘의 행운 의식 : 마음을 차분히 하세요*
        </div>
      </div>
      <FloatingBtnGroup isResultPage />
    </div>
  );
};

export default ResultPage;
