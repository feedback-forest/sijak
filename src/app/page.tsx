"use client";

import { Card, ImageDescription } from "@/shared/ui";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh_-_68px)] mt-12">
      <div className="grid w-full h-full grid-cols-3 p-4 gap-4">
        <Card className="flex items-center justify-center p-4">
          <Link href="/sijak">
            <ImageDescription
              containerWidth={456}
              containerHeight={220}
              src="/images/main_banner_1.png"
              alt="sijak"
              width={250}
              height={400}
              imageDescription="50+ 시ː니어를 위한 문화생활 사이트"
            />
          </Link>
        </Card>
        <Card className="flex items-center justify-center p-4">
          <Link href="/typing">
            <ImageDescription
              containerWidth={456}
              containerHeight={220}
              src="/images/typing_banner.png"
              alt="typing"
              width={150}
              height={250}
              imageDescription="타이핑 프로젝트"
            />
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Home;
