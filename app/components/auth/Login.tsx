"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
import Image from "next/image";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Handle login logic here
      console.log("Logging in user:", { email });
      // After login, navigate to dashboard or home page
      router.push("/");
    } catch (error) {
      setError("Failed to login. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[550px] border border-gray-200">
      <AuthLogo />
      <AuthLoginDescription
        header="Welcome back"
        description="Login to your account below"
      />
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-[14px]">
          {error}
        </div>
      )}
      <div>
        <Button fullWidth variant="outline" size="md" className="mb-8 border-gray-200!">
          <Image
            src="/assets/google.png"
            alt="Login Image"
            width={20}
            height={20}
          />
          Continue with Google
        </Button>
      </div>
      <div className="w-full space-y-4">
        <InputField
          title="Email Address"
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
      </div>
      <p
        className="text-right text-[15px] font-medium text-gray-500 cursor-pointer mt-2 hover:underline"
        onClick={() => router.push("/forgot-password")}
      >
        Forgot Password?
      </p>
      <div className="mt-6">
        <Button
          fullWidth
          variant="primary"
          size="md"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-[15px]">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="font-semibold text-primary cursor-pointer hover:underline"
          >
            Sign Up for free
          </span>
        </p>
      </div>
    </div>
  );
}
