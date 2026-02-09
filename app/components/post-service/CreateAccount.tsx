import { useState } from "react";
import InputFieldOriginal from "../ui/InputField";
import Button from "../ui/Button";

const InputField = InputFieldOriginal;

import "react-phone-number-input/style.css";
import { useCreateJobPostMutation } from "@/store/slice/categoriesSlice";
import Checkbox from "./Checkbox";
import NewAccount from "./NewAccount";

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
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [accountData, setAccountData] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
  } | null>(null);

  const [createJobPost, { isLoading: isCreatingJobPost }] =
    useCreateJobPostMutation();

  const isLoading = isCreatingJobPost;

  const handleSubmit = async () => {
    // if (!postcode || !email || !name || !phoneValue || !password) {
    //   setError("Please fill all the fields");
    //   return;
    // }

    setError(null);
    setSuccess(false);

    try {
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
        contactEmail: accountData?.email || "",
        contactPhone: accountData?.phone || "",
        clientName: accountData?.name || "",
      };

      const jobPostResponse = await createJobPost(jobPostPayload).unwrap();
      console.log("Job post created:", jobPostResponse);

      setSuccess(true);
      // Reset form
      setPostcode("");
    } catch (err) {
      console.error("Error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div className="mt-6 lg:mt-10 space-y-6 lg:space-y-10">
      {/* Step 1: Create Account - Show until verified */}
      {!isAccountVerified && (
        <NewAccount
          onAccountVerified={() => setIsAccountVerified(true)}
          onDataChange={setAccountData}
        />
      )}

      {/* Step 2: Job Post Details - Show after account verified */}
      {isAccountVerified && (
        <>
          <div>
            <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
              Postcode for the job
            </h3>
            <p className="text-[16px] text-primaryTextLight mb-4">
              To find tradespeople near you we need to know where the job is
            </p>
            <InputField
              placeholder="Eg. SW1A 2AB"
              // value={postcode}
              onChange={(val: string) => setPostcode(val)}
            />
          </div>

          {error && <p className="text-red-500 text-[14px]">{error}</p>}
          {success && (
            <p className="text-green-500 text-[14px]">
              Job post submitted successfully!
            </p>
          )}
          <Checkbox onTermsChange={setTermsAccepted} />
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || !termsAccepted}
            className="w-full"
          >
            {isLoading ? "Submitting..." : "Submit Job Post"}
          </Button>
        </>
      )}
    </div>
  );
}
