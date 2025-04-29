import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { TbCrown, TbLogin2 } from "react-icons/tb";
import { Divider } from "../../Divider";
import { cn } from "@/shared/lib/utils";

const TypingHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const url = pathname.split("/")[2];

  const isRenderHeader = () => {
    if (url === "login") return false;
    return true;
  };

  const isRenderMobileArrow = () => {
    if (url === "result" || url === "ranking" || url === "signup") {
      return true;
    }
    return false;
  };

  const isRenderLogin = () => {
    if (url === "signup") return false;
    // TODO: 유저 전역 객체에 토큰이 있으면 유저 아이콘으로 변경
    return true;
  };

  const backToPreviousPage = () => {
    router.back();
  };

  const renderTitle = () => {
    if (url === "ranking") return "랭킹";
    if (url === "signup") return "회원정보 입력";
    else if (url === undefined) return "write.type";
    else return "";
  };

  return (
    isRenderHeader() && (
      <header
        className={cn(
          "flex w-full justify-between items-center mobile:h-12 mobile:px-4",
          isRenderMobileArrow() && "border-b-[0.5px] border-[#DCDEE2 ]",
        )}
      >
        {isRenderMobileArrow() ? (
          <div className="desktop:hidden tablet:hidden mobile:flex justify-start items-center mobile:w-6 mobile:h-6">
            <div onClick={backToPreviousPage}>
              <Image
                src="/icons/ic_back.svg"
                alt="back"
                width={24}
                height={24}
              />
            </div>
          </div>
        ) : (
          <div>
            <div onClick={() => router.push("/typing/ranking")}>
              <TbCrown size={24} />
            </div>
          </div>
        )}
        <div className="text-lg font-black">{renderTitle()}</div>
        {isRenderLogin() ? (
          <div className="w-6">
            <div onClick={() => router.push("/typing/login")}>
              <TbLogin2 size={24} />
            </div>
          </div>
        ) : (
          <div className="w-6"></div>
        )}
      </header>
    )
  );
};

export default TypingHeader;
