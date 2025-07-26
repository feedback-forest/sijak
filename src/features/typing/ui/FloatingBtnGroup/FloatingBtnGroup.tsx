"use client";

import { cn, handleCopyClipBoard } from "@/shared/lib/utils";
import usePhraseStore from "@/shared/store/phrase";
import { IconButton } from "@/shared/ui";
import { toast } from "@/shared/hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import useGetTypingList from "../../api/useGetTypingList";

interface FloatingBtnGroupProps {
  isResultPage?: boolean;
  reset?: () => void;
  download?: () => void;
}

const FloatingBtnGroup = ({
  isResultPage,
  reset,
  download,
}: FloatingBtnGroupProps) => {
  const { phraseInfo, setPhraseInfo } = usePhraseStore();

  const router = useRouter();
  const pathname = usePathname();
  const url = pathname.split("/")[2];

  const handleRetry = () => {
    if (url === "result" && phraseInfo) {
      setPhraseInfo(phraseInfo.phraseIndex, phraseInfo.phrase);
      router.push("/typing");
      return;
    }
    if (phraseInfo && reset) {
      setPhraseInfo(phraseInfo.phraseIndex, phraseInfo.phrase);
      reset();
    }
  };

  const handleNext = () => {
    console.log(phraseInfo);
    if (url === "result") {
      router.push("/typing");
      return;
    }
    if (phraseInfo && phraseInfo.phrase.length - 3 === phraseInfo.phraseIndex) {
      toast({
        title: "글이 하나 남았어요.",
      });
    }
    if (phraseInfo && phraseInfo.phrase.length - 2 === phraseInfo.phraseIndex) {
      toast({
        title: "마지막 글이에요.",
      });
    }

    if (phraseInfo && phraseInfo.phrase.length - 1 === phraseInfo.phraseIndex) {
      window.location.reload();
      return;
    }

    if (phraseInfo && phraseInfo.phrase.length > phraseInfo.phraseIndex) {
      setPhraseInfo(phraseInfo.phraseIndex + 1, phraseInfo.phrase);
    }
  };

  const handleDownload = () => {
    if (download) {
      download();
    }
  };

  const shareLinkToURL = () => {
    const currentUrl = window.location.href;
    handleCopyClipBoard(currentUrl);
    toast({
      title: "링크를 복사했어요.",
    });
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-10">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row w-full gap-[2px]">
          <IconButton
            src="/icons/retry.svg"
            alt="retry"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className="border rounded-full bg-white"
            handleClick={handleRetry}
          />
          <IconButton
            src="/icons/next.svg"
            alt="next"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className="border rounded-full bg-white"
            handleClick={handleNext}
          />
        </div>
        <div className="flex flex-row">
          {!!isResultPage && (
            <IconButton
              src="/icons/download.svg"
              alt="download"
              iconWidth={24}
              iconHeight={24}
              buttonWidth={56}
              buttonHeight={56}
              className={cn("border rounded-full", isResultPage && "bg-black")}
              handleClick={handleDownload}
            />
          )}
          <IconButton
            src={
              isResultPage
                ? "/icons/share_typing_white.svg"
                : "/icons/share_typing.svg"
            }
            alt="share"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className={cn("border rounded-full", isResultPage && "bg-black")}
            handleClick={shareLinkToURL}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingBtnGroup;
