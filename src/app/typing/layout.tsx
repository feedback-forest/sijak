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

export const metadata = {
  title: "타자모어",
  description: "한결같이 굳건하게",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function TypingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className={`${pretendard.className} flex flex-col w-full desktop:pt-[70px] tablet:pt-[70px] mobile:pt-5 max-w-[375px] relative h-screen`}
      >
        <Providers>
          <main>{children}</main>
          <Toaster />
          <ToastToaster />
        </Providers>
      </div>
    </div>
  );
}
