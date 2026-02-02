import React, { useState } from "react";
import InputField from "../ui/InputField";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function CreateAccount() {
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");

  return (
    <div className="mt-6 lg:mt-10 space-y-6 lg:space-y-10">
      <div>
        <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
          Postcode for the job
        </h3>
        <p className="text-[16px] text-primaryTextLight mb-4">
          To find tradepeople near you we need to know where the job is
        </p>
        <InputField
          placeholder="Eg. SW1A 2AB"
          onChange={(val) => console.log("Input changed:", val)}
        />
      </div>
      <div>
        <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
          Your Email Address
        </h3>
        <p className="text-[16px] text-primaryTextLight mb-4">
          To get response from tradepeople easily we’ll share this email & phone
          number with them
        </p>
        <div className="space-y-4 lg:space-y-6">
          <InputField
            title="Email Address"
            placeholder="example.email@gmail.com"
            onChange={(val) => console.log("Input changed:", val)}
          />
          <h4 className="block text-[14px] lg:text-[16px] text-primaryText mb-2">
            Phone number
          </h4>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            countries={["GB"]}
            defaultCountry="GB"
            value={phoneValue}
            onChange={setPhoneValue}
            placeholder="Enter your phone number"
            className="phone-input-no-focus"
            style={{
              height: 58,
              border: "1px solid #1f2933",
              borderRadius: "6px",
              paddingLeft: "12px",
              fontSize: "16px",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>
      <div>
        <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
          Create an account to track your jobs
        </h3>
        <p className="text-[16px] text-primaryTextLight mb-4">
          To get response from tradepeople easily we’ll share this Information
          with them
        </p>
        <div className="space-y-4 lg:space-y-6">
          <InputField
            title="Name"
            placeholder="Your full name"
            onChange={(val) => console.log("Input changed:", val)}
          />
          <h4 className="block text-[14px] lg:text-[16px] text-primaryText mb-2" >
            Phone number
          </h4>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            countries={["GB"]}
            defaultCountry="GB"
            value={phoneValue}
            onChange={setPhoneValue}
            placeholder="Enter your phone number"
            className="phone-input-no-focus"
            style={{
              height: 58,
              border: "1px solid #1f2933",
              borderRadius: "6px",
              paddingLeft: "12px",
              fontSize: "16px",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>
    </div>
  );
}
