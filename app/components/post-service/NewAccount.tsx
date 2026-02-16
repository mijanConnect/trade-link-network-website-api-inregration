import { useState } from "react";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";
import InputField from "../ui/InputField";
import {
  useCreateCustomerMutation,
  useVerifyPhoneMutation,
} from "@/store/slice/authSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface NewAccountProps {
  onDataChange?: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
  onAccountVerified?: () => void;
}

export default function NewAccount({
  onDataChange,
  onAccountVerified,
}: NewAccountProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");
  const [password, setPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const [createCustomer, { isLoading: isCreating }] =
    useCreateCustomerMutation();
  const [verifyPhone, { isLoading: isVerifying }] = useVerifyPhoneMutation();

  // Notify parent component whenever data changes
  const handleDataChange = (field: string, value: string) => {
    const updatedData = {
      name: field === "name" ? value : name,
      email: field === "email" ? value : email,
      phone: field === "phone" ? value : phoneValue || "",
      password: field === "password" ? value : password,
    };

    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhoneValue(value);
    if (field === "password") setPassword(value);

    onDataChange?.(updatedData);
  };

  // Handle Create Account
  const handleCreateAccount = async () => {
    if (!name || !email || !phoneValue || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await createCustomer({
        name,
        email,
        phone: phoneValue,
        password,
      }).unwrap();

      toast.success(
        "Account created! Please verify your phone with the OTP sent to you.",
      );
      setShowOtpInput(true);
      setIsAccountCreated(true);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to create account");
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await verifyPhone({
        phone: phoneValue,
        oneTimeCode: parseInt(otp),
      }).unwrap();

      if (result.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        toast.success("Phone verified successfully! You are now logged in.");
        onAccountVerified?.();
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to verify OTP");
    }
  };
  return (
    <>
      <div>
        <h3 className="block text-[18px] font-semibold text-primaryText mb-1">
          Create account
        </h3>
        <p className="text-[16px] text-primaryTextLight mb-4">
          To keep track of your jobs and get the best tradespeople response
        </p>
        <div className="space-y-4 lg:space-y-6">
          <div>
            <label className="block text-[14px] lg:text-[16px] text-primaryText mb-2">
              Name
            </label>
            <InputField
              disabled={showOtpInput}
              placeholder="Enter your name"
              initialValue={name}
              onChange={(val: string) => handleDataChange("name", val)}
            />
          </div>
          <div>
            <label className="block text-[14px] lg:text-[16px] text-primaryText mb-2">
              Email Address
            </label>
            <InputField
              disabled={showOtpInput}
              placeholder="example.email@gmail.com"
              initialValue={email}
              onChange={(val: string) => handleDataChange("email", val)}
            />
          </div>
          <div>
            <h4 className="block text-[14px] lg:text-[16px] text-primaryText mb-2">
              Phone number
            </h4>
            <PhoneInputWithCountrySelect
              disabled={showOtpInput}
              international
              countryCallingCodeEditable={false}
              countries={["GB"]}
              defaultCountry="GB"
              value={phoneValue}
              onChange={(val) => handleDataChange("phone", val || "")}
              placeholder="Enter your phone number"
              className="phone-input-no-focus"
              style={{
                height: 58,
                border: "1px solid #1f2933",
                borderRadius: "6px",
                paddingLeft: "12px",
                fontSize: "16px",
                fontFamily: "inherit",
                opacity: showOtpInput ? 0.5 : 1,
                cursor: showOtpInput ? "not-allowed" : "text",
              }}
            />
          </div>
          <div>
            <label className="block text-[14px] lg:text-[16px] text-primaryText mb-2">
              Password
            </label>
            <InputField
              disabled={showOtpInput}
              type="password"
              placeholder="Enter your password"
              initialValue={password}
              onChange={(val: string) => handleDataChange("password", val)}
            />
          </div>

          {/* Create Account Button */}
          {!isAccountCreated && (
            <div className="pt-2">
              <Button
                onClick={handleCreateAccount}
                disabled={
                  isCreating || !name || !email || !phoneValue || !password
                }
                className="w-full h-[58px] bg-primary hover:bg-primary/90 text-white font-semibold text-[16px] rounded-md disabled:opacity-50"
              >
                {isCreating ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          )}

          {/* OTP Verification Section */}
          {showOtpInput && (
            <>
              <div>
                <label className="block text-[14px] lg:text-[16px] text-primaryText mb-2">
                  Enter 6-digit OTP
                </label>
                <InputField
                  type="text"
                  placeholder="Enter OTP"
                  initialValue={otp}
                  onChange={(val: string) => {
                    // Only allow numbers and max 6 digits
                    if (/^\d*$/.test(val) && val.length <= 6) {
                      setOtp(val);
                    }
                  }}
                />
              </div>
              <div className="pt-2">
                <Button
                  onClick={handleVerifyOtp}
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full h-[58px] bg-primary hover:bg-primary/90 text-white font-semibold text-[16px] rounded-md disabled:opacity-50"
                >
                  {isVerifying ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
