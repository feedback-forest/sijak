export interface LectureDetailItemProps {
  title: string;
  content?: string;
}

const LectureDetailItem = ({ title, content }: LectureDetailItemProps) => {
  return (
    <div className="flex flex-row gap-9">
      <div className="flex min-w-[72px] max-w-[72px] text-xl text-custom-textTitleGrayColor">
        {title}
      </div>
      {content && <div className="flex text-xl">{content}</div>}
    </div>
  );
};

export default LectureDetailItem;
