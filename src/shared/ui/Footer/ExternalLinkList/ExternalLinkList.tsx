import ExternalLink, {
  ExternalLinkProps,
} from "../../ExternalLink/ExternalLink";

export const externalLinkList: Array<ExternalLinkProps> = [
  {
    link: "https://www.notion.so/6d012c4a80f845eca3d98defc11d6d86?pvs=4",
    content: "개인정보처리방침",
  },
  {
    link: "https://www.notion.so/b942a4f9070442b7891cb136037ffa74?pvs=4",
    content: "이용약관",
  },
  {
    link: "https://www.notion.so/17e92e6c1188429cb17ad92d84f65103?pvs=4",
    content: "위치정보 이용약관",
  },
  {
    link: "https://www.notion.so/f34337d192d54efd818663cbeb2ad77c?pvs=4",
    content: "서비스가이드",
  },
];

const ExternalLinkList = () => {
  return (
    <nav className="flex flex-row h-[21px] desktop:gap-5 tablet:gap-5 mobile:gap-[5px] text-custom-textDescriptionGrayColor desktop:text-sm tablet:text-sm mobile:text-[12px] font-medium">
      {externalLinkList.map((externalLink, idx) => (
        <div className="flex flex-row items-center h-full" key={idx}>
          <div key={externalLink.content}>
            <ExternalLink
              link={externalLink.link}
              content={externalLink.content}
            />
          </div>
          {idx !== externalLinkList.length - 1 && (
            <div className="h-[10px] border-custom-textDescriptionGrayColor desktop:text-base tablet:text-base mobile:text-[12px] border-r desktop:pl-5 tablet:pl-5 mobile:pl-[5px] py-[5.5px]" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default ExternalLinkList;
