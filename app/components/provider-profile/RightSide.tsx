import React from "react";
import SingleReview from "./SingleReview";
import Button from "../ui/Button";

export default function RightSide() {
  return (
    <>
      <div>
        <div>
          <h2 className="text-[24px] lg:text-[32px] text-primaryText font-bold mb-1 lg:mb-4">
            About
          </h2>
          <p className="text-[14px] lg:text-[16px] text-primaryTextLight leading-6 lg:leading-7 mb-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </p>
          <p className="text-[14px] lg:text-[16px] text-primaryTextLight leading-7 mb-2">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>

        <div className="mt-6 lg:mt-12">
          <SingleReview />
          <SingleReview />
          <SingleReview />
        </div>
        <Button className="mt-6 lg:mt-8">View All Reviews</Button>
      </div>
    </>
  );
}
