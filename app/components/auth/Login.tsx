"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
// import Image from "next/image";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";
import { useLoginMutation } from "@/store/slice/authSlice";
import { toast } from "sonner";
import { config } from "@/lib/config";

// Helper function to decode JWT and extract role
const getRoleFromToken = (token: string): string | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const decoded = JSON.parse(atob(parts[1]));
    return decoded?.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  // Redirect already logged-in users
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const role = getRoleFromToken(token);
      if (role === "PROFESSIONAL") {
        window.location.href = config.TRADE_PERSON_REDIRECT_URL;
      } else if (role === "CUSTOMER") {
        router.push("/");
      }
    }
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill out both fields.");
      return;
    }
    try {
      const response = await login({ email, password }).unwrap();
      // Save token to localStorage if present in response
      if (response?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=86400;`;
        toast.success("Login successful!");
      }
      // Extract role from JWT token
      const token = response?.data?.accessToken;
      const role = token ? getRoleFromToken(token) : null;

      if (role === "PROFESSIONAL") {
        // Redirect PROFESSIONAL users to external trade-person URL
        window.location.href = config.TRADE_PERSON_REDIRECT_URL;
      } else {
        router.push("/");
      }
    } catch (err) {
      const error = err as Record<string, unknown>;
      console.error("Full error:", error);
      console.error("Error data:", error?.data);

      let errorMessage = "Login failed. Please check your credentials.";

      // RTK Query error structure: { status, data: { message, success, ... } }
      const errorData = error?.data as Record<string, unknown> | undefined;
      if (errorData?.message && typeof errorData.message === "string") {
        errorMessage = errorData.message;
      }

      console.log("Toast message:", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-background shadow-sm p-4 lg:p-8 rounded-lg w-full max-w-[550px] border border-gray-200">
      <AuthLogo />
      <AuthLoginDescription
        header="Welcome back"
        description="Login to your account below"
      />
      <div className="w-full space-y-4">
        <InputField
          title="Email Address"
          type="email"
          placeholder="Enter your email"
          initialValue={email}
          onChange={(v) => setEmail(v)}
        />
        <InputField
          title="Password"
          type="password"
          placeholder="Enter your password"
          initialValue={password}
          onChange={(v) => setPassword(v)}
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
          loading={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}{" "}
          {/* Button text changes based on loading state */}
        </Button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-[15px]">
          Sign Up as{" "}
          <span
            onClick={() => router.push("/register-professional")}
            className="font-semibold text-primary cursor-pointer hover:underline"
          >
            Tradeperson
          </span>
        </p>
      </div>
    </div>
  );
}
