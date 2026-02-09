
import LeftPart from "./LeftPart";
import RightSide from "./RightSide";

export default function ProviderContainer() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        <LeftPart />
        <RightSide />
      </div>
    </>
  );
}
