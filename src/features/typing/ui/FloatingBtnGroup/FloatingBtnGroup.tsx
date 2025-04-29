import { cn } from "@/shared/lib/utils";
import usePhraseStore from "@/shared/store/phrase";
import { IconButton } from "@/shared/ui";

interface FloatingBtnGroupProps {
  isResultPage?: boolean;
}

const FloatingBtnGroup = ({ isResultPage }: FloatingBtnGroupProps) => {
  const { phrase } = usePhraseStore();

  return (
    <div className="absolute bottom-4 left-4 right-4">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row w-full gap-[2px]">
          <IconButton
            src="/icons/retry.svg"
            alt="retry"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className="border rounded-full"
          />
          <IconButton
            src="/icons/next.svg"
            alt="retry"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className="border rounded-full"
          />
        </div>
        <div className="flex flex-row">
          {!!isResultPage && (
            <IconButton
              src="/icons/download.svg"
              alt="retry"
              iconWidth={24}
              iconHeight={24}
              buttonWidth={56}
              buttonHeight={56}
              className={cn("border rounded-full", isResultPage && "bg-black")}
            />
          )}
          <IconButton
            src={
              isResultPage
                ? "/icons/share_typing_white.svg"
                : "/icons/share_typing.svg"
            }
            alt="retry"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className={cn("border rounded-full", isResultPage && "bg-black")}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingBtnGroup;
