import Link from "next/link";
import { useState } from "react";

interface CheckboxProps {
  onTermsChange?: (checked: boolean) => void;
}

export default function Checkbox({ onTermsChange }: CheckboxProps) {
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleTermsChange = (checked: boolean) => {
    setAgreeTerms(checked);
    onTermsChange?.(checked);
  };

  return (
    <div className="mt-6 space-y-4 lg:space-y-6">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms-agree"
            checked={agreeTerms}
            onChange={(e) => handleTermsChange(e.target.checked)}
            className="h-4.5 w-4.5 rounded border-gray-300 bg-transparent! accent-primary cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
          />
          <label
            htmlFor="terms-agree"
            className="text-[14px] text-primaryTextLight cursor-pointer"
          >
            I would like to receive all marketing communications about Trade
            Link Network&apos;s Services by email, SMS and phone.
          </label>
        </div>
      </div>
      <p className="text-[14px] text-primaryTextLight">
        By clicking Continue, You agree to Trade Link Network&apos;s{" "}
        <Link href="/terms-conditions">
          <span className="text-primary underline hover:text-primary/70 transition transform ">
            Terms & Conditions
          </span>
        </Link>{" "}
        and <br /> how we process your data, see our{" "}
        <Link href="/privacy-policy">
          <span className="text-primary underline hover:text-primary/70 transition transform ">
            Privacy Policy
          </span>
        </Link>
      </p>
    </div>
  );
}
