"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";
import { useRegisterMutation } from "@/store/slice/authSlice";

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //   const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // if (!agreedToTerms) {
    //   setError("Please agree to the terms and conditions");
    //   return;
    // }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    try {
      const payload = {
        name,
        email,
        password,
        role: "PROFESSIONAL",
      };

      const response = await register(payload).unwrap();

      console.log("Registration successful:", response);
      if (typeof window !== "undefined") {
        localStorage.setItem("otpContext", "signup");
        localStorage.setItem("signupEmail", email);
      }

      router.push("/verify-register-otp");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to register. Please try again.";
      setError(errorMessage);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[550px] border border-gray-200">
      <AuthLogo />
      <AuthLoginDescription
        header="Sign Up as Tradeperson"
        description="Register for free — no subscription"
      />
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-[14px]">
          {error}
        </div>
      )}
      <div className="w-full space-y-4">
        <InputField
          title="Name"
          type="text"
          placeholder="Enter your name"
          initialValue={name}
          onChange={(value) => {
            setName(value);
            setError("");
          }}
        />

        <InputField
          title="Email"
          type="email"
          placeholder="Enter your email"
          initialValue={email}
          onChange={(value) => {
            setEmail(value);
            setError("");
          }}
        />

        <InputField
          title="Password"
          type="password"
          placeholder="Enter your password"
          initialValue={password}
          onChange={(value) => {
            setPassword(value);
            setError("");
          }}
        />

        <InputField
          title="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          initialValue={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            setError("");
          }}
        />
      </div>

      <div className="mt-6">
        <Button
          fullWidth
          variant="primary"
          size="md"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[15px]">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="font-semibold text-primary cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
