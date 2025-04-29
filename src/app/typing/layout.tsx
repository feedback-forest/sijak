import Providers from "@/features/provider/Provider";
import "../globals.css";
import localFont from "next/font/local";
import { ToastToaster, Toaster } from "@/shared/ui";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function TypingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div
        className={`${pretendard.className} flex flex-col w-full h-full  desktop:pt-[70px] tablet:pt-[70px] mobile:pt-5`}
      >
        <Providers>
          <main>{children}</main>
          <Toaster />
          <ToastToaster />
        </Providers>
      </div>
    </>
  );
}
