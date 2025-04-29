import Image from "next/image";

const FooterSijakLogo = () => {
  return (
    <div className="flex flex-row items-center justify-center h-[42px] gap-[10px] text-custom-textDescriptionGrayColor">
      <div>
        <Image
          src="/icons/sijak_footer_logo.svg"
          alt="sijak footer logo"
          width={42}
          height={42}
        />
      </div>
      <div className="flex flex-col gap-0">
        <div className="text-sm text-custom-textDescriptionGrayColor font-medium">
          시ː작이 반이다.
        </div>
        <div className="text-sm text-custom-textDescriptionGrayColor font-medium">
          모든 여정은 한 걸음에서 시작됩니다.
        </div>
      </div>
    </div>
  );
};

export default FooterSijakLogo;
