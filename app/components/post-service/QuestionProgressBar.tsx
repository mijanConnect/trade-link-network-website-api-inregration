interface QuestionProgressBarProps {
  current?: number;
  total?: number;
}

export default function QuestionProgressBar({
  current = 1,
  total = 10,
}: QuestionProgressBarProps) {
  const progressPercentage = (current / total) * 100;

  return (
    <>
      <div className="mb-6 lg:mb-8 sticky top-0 z-30 bg-cardBg pt-2">
        <h2 className="text-[16px] lg:text-[18px] font-semibold text-primaryTextLight mb-2">
          Outdoor & Landscaping Service
        </h2>
        <div className="w-full bg-gray-200 border-2 border-gray-300 rounded-full h-3 mb-1 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mb-2 lg:mb-6">
          <span className="text-[14px] font-medium text-primaryTextLight">
            {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </>
  );
}
