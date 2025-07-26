"use client";

import { useEffect, useState } from "react";

import { ExternalLinkList } from "./ExternalLinkList";
import { FooterSijakLogo } from "./FooterSijakLogo";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [windowInnerWidth, setWindowInnerWidth] = useState<string>();

  const pathname = usePathname();
  const url = pathname.split("/")[1];

  const isRenderFooter = () => {
    if (url !== "login" && url !== "class" && url !== "signup") {
      return true;
    }
    return false;
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1440) {
      // desktop
      setWindowInnerWidth("desktop");
    } else if (width >= 768) {
      // tablet
      setWindowInnerWidth("tablet");
    } else {
      // mobile
      setWindowInnerWidth("mobile");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderFooter = () => {
    if (windowInnerWidth === "desktop") {
      return renderDesktopFooter();
    }
    if (windowInnerWidth === "tablet") {
      return renderTabletFooter();
    }
    if (windowInnerWidth === "mobile") {
      return renderMobileFooter();
    }
  };

  const renderDesktopFooter = () => {
    return (
      <div className="flex flex-row w-full justify-between">
        <FooterSijakLogo />
        <ExternalLinkList />
      </div>
    );
  };

  const renderTabletFooter = () => {
    return (
      <div className="flex flex-col items-start gap-10">
        <ExternalLinkList />
        <FooterSijakLogo />
      </div>
    );
  };

  const renderMobileFooter = () => {
    return (
      <div className="flex flex-col items-start gap-8">
        <ExternalLinkList />
        <FooterSijakLogo />
      </div>
    );
  };

  return (
    isRenderFooter() && (
      <footer className="flex justify-between w-full h-[208px] bg-custom-footerBackground desktop:px-[120px] tablet:px-8 mobile:px-6 pt-8 border-t max-w-[1440px] mx-auto my-0 mobile:gap-4">
        {renderFooter()}
      </footer>
    )
  );
};

export default Footer;
