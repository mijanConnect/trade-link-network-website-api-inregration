import React, { useState } from "react";
import InputFieldOriginal from "../ui/InputField";
import Button from "../ui/Button";

const InputField = InputFieldOriginal;

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  useCreateCustomerMutation,
  useCreateJobPostMutation,
} from "@/store/slice/categoriesSlice";

interface CreateAccountProps {
  categoryId?: string;
  serviceSelection?: string | null;
  answeredQuestions?: Array<{ question: string; answer: string | string[] }>;
}

export default function CreateAccount({
  categoryId,
  serviceSelection,
  answeredQuestions,
}: CreateAccountProps) {
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [createCustomer, { isLoading: isCreatingCustomer }] =
    useCreateCustomerMutation();
  const [createJobPost, { isLoading: isCreatingJobPost }] =
    useCreateJobPostMutation();

  const isLoading = isCreatingCustomer || isCreatingJobPost;

  const handleSubmit = async () => {
    // if (!postcode || !email || !name || !phoneValue || !password) {
    //   setError("Please fill all the fields");
    //   return;
    // }

    setError(null);
    setSuccess(false);

    try {
      // Step 1: Create customer account
      // const customerPayload = {
      //   name: name,
      //   email: email,
      //   phone: phoneValue,
      //   password: password,
      // };

      // const customerResponse = await createCustomer(customerPayload).unwrap();
      // console.log("Customer created:", customerResponse);

      // Step 2: Save token to localStorage
      // const token = customerResponse?.token || customerResponse?.accessToken;
      // if (token) {
      //   localStorage.setItem("accessToken", token);
      //   localStorage.setItem("token", token);
      //   console.log("Token saved:", token);
      // }

      // Step 3: Create job post
      const jobPostPayload = {
        service: serviceSelection,
        category: categoryId,
        location: {
          coordinates: [-0.1276, 51.5074],
        },
        postcode: postcode,
        country: "GB",
        region: "London",
        area: "Central London",
        locationName: "Central London, UK",
        answeredQuestions: answeredQuestions || [],
        isUrgent: true,
        description: "Job post from Trade Link Network 2",
        contactEmail: email,
        contactPhone: phoneValue,
        clientName: name,
      };

      const jobPostResponse = await createJobPost(jobPostPayload).unwrap();
      console.log("Job post created:", jobPostResponse);

      setSuccess(true);
      // Reset form
      setPostcode("");
      setEmail("");
      setName("");
      setPhoneValue("");
      setPassword("");
    } catch (err: any) {
      console.error("Error:", err);
      const errorMessage =
        err?.data?.message || err?.message || "An error occurred";
      setError(errorMessage);
    }
  };

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
          value={postcode}
          onChange={(val: string) => setPostcode(val)}
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
            value={email}
            onChange={(val: string) => setEmail(val)}
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
      {/* Create an account */}
      {/* <div>
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
            value={name}
            onChange={(val: string) => setName(val)}
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
          <InputField
            title="Password"
            placeholder="Enter a strong password"
            type="password"
            value={password}
            onChange={(val: string) => setPassword(val)}
          />
        </div>
      </div> */}
      {error && <p className="text-red-500 text-[14px]">{error}</p>}
      {success && (
        <p className="text-green-500 text-[14px]">
          Job post submitted successfully!
        </p>
      )}
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Submitting..." : "Submit Job Post"}
      </Button>
    </div>
  );
}
