"use client";

import { usePathname } from "next/navigation";
import {
  HeaderDescription,
  HeaderFeatures,
  HeaderPrevious,
  HeaderTitle,
} from ".";
import { Logo } from "./Logo";
import TypingHeader from "./TypingHeader/TypingHeader";

const Header = () => {
  const pathname = usePathname();
  const url = pathname.split("/")[1];

  const isRenderHeader = () => url !== "signup";
  const isRenderSijakHeader = () => url === "sijak" || url === "";

  const renderHeaderDescription = () => {
    if (url === "sijak") {
      return (
        <HeaderDescription description="50+ 시ː니어를 위한 문화생활 사이트" />
      );
    }
    return <HeaderDescription description="재미난 컨텐츠의 시작" />;
  };

  const renderHeaderFeatures = () => {
    if (url === "sijak") {
      return <HeaderFeatures />;
    }
    return null;
  };

  return (
    isRenderHeader() &&
    (isRenderSijakHeader() ? (
      <header className="flex w-full desktop:justify-between tablet:justify-between mobile:justify-between items-center desktop:max-w-[1440px] tablet:max-w-[1440px] mobile:max-w-[768px] desktop:h-[70px] tablet:h-[70px] mobile:h-12 desktop:px-[120px] tablet:px-6 mobile:px-4 desktop:gap-2 tablet:gap-2 fixed top-0 bg-white z-[101] border-b border-custom-disabled">
        <div className="flex flex-row gap-5">
          <Logo />
          <HeaderPrevious />
          {renderHeaderDescription()}
        </div>
        <HeaderTitle />
        {renderHeaderFeatures()}
      </header>
    ) : (
      <TypingHeader />
    ))
  );
};

export default Header;
