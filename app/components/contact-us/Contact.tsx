import React from "react";
import ContactInputField from "./ContactInputField";
import Button from "../ui/Button";
import ContactDetails from "./ContactDetails";

export default function Contact() {
  return (
    <>
      <div className="my-6 lg:my-15 border rounded-lg px-4 md:px-18 py-4 lg:py-10 flex flex-col lg:flex-row gap-10 md:gap-20">
        <div className="flex-9/4">
          <h1 className="text-[28px] md:text-[40px] text-primaryText font-bold">
            Get In Touch
          </h1>
          <p className="mb-3 lg:mb-6 text-[14px] lg:text-[16px] text-primaryTextLight max-w-[550px] leading-5.5 lg:leading-7.5 mt-1 lg:mt-4">
            Life moves fast, but every journey deserves comfort, safety, and a
            touch of freedom — that’s the ride we deliver, mile after mile
          </p>
          <div className="flex flex-col gap-2 md:gap-6">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <ContactInputField
                label="First Name*"
                placeholder="Enter First Name"
                inputType="text"
              />
              <ContactInputField
                label="Last Name"
                placeholder="Enter Last Name"
                inputType="text"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <ContactInputField
                label="Email*"
                placeholder="Enter Email"
                inputType="email"
              />
              <ContactInputField
                label="Phone"
                placeholder="Enter Phone"
                inputType="text"
              />
            </div>
            <div className="">
              <ContactInputField
                label="Message*"
                placeholder="Write your message here..."
                inputType="textArea"
                rows={8}
              />
            </div>
          </div>
          <Button className="w-full mt-4 lg:mt-11">Send Message</Button>
        </div>
        <div className="flex-9/5">
          <ContactDetails />
        </div>
      </div>
    </>
  );
}
