type AboutUsProps = {
  content?: string;
};

export default function AboutUs({ content }: AboutUsProps) {
  return (
    <>
      <div className="container mx-auto px-4 my-6 lg:mt-15 lg:mb-30">
        <div className="">
          <h2 className="text-[24px] lg:text-[48px] font-semibold text-primaryTextmb-4 lg:mb-15 text-center">
            About Us
          </h2>

          {content ? (
            <div
              className="text-primaryText text-[14px] lg:text-[18px]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="text-gray-600 text-center py-10">
              About us content not available.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
