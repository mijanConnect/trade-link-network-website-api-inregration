"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/ui/InputField";
import Button from "@/app/components/ui/Button";
// import Image from "next/image";
import AuthLogo from "./AuthLogo";
import AuthLoginDescription from "./AuthLoginDescription";
import { useLoginMutation } from "@/store/slice/authSlice";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

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
        toast.success("Login successful!");
      }

      router.push("/"); // Redirect to dashboard or any desired page after login
    } catch (err) {
      // Handle error if login fails
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
      {/* <div>
        <Button
          fullWidth
          variant="outline"
          size="md"
          className="mb-8 border-gray-200!"
        >
          <Image
            src="/assets/google.png"
            alt="Login Image"
            width={20}
            height={20}
          />
          Continue with Google
        </Button>
      </div> */}
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
          onClick={handleLogin} // Handle login on button click
          loading={isLoading} // Show loading spinner while logging in
        >
          {isLoading ? "Logging in..." : "Login"}{" "}
          {/* Button text changes based on loading state */}
        </Button>
      </div>
      <div className="mt-6 text-center">
        <p className="text-[15px]">
          Sign Up as{" "}
          <span
            onClick={() => router.push("/register")}
            className="font-semibold text-primary cursor-pointer hover:underline"
          >
            Tradeperson
          </span>
        </p>
      </div>
    </div>
  );
}
