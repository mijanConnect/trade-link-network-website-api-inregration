"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { useProfileQuery } from "@/store/slice/authSlice";

export default function ProfileCheckModal() {
  const [showProfileWarning, setShowProfileWarning] = useState(false);
  const router = useRouter();

  // Fetch profile data on mount
  const { data: profileData, isLoading } = useProfileQuery({});

  useEffect(() => {
    if (!isLoading && profileData) {
      const isProfileCompleted = profileData?.isProfileCompleted;

      console.log("Profile data:", profileData);
      console.log("Is profile completed:", isProfileCompleted);

      // Show warning if profile is not completed
      if (isProfileCompleted === false) {
        setTimeout(() => {
          setShowProfileWarning(true);
        }, 500); // Small delay to ensure page is loaded
      }
    }
  }, [isLoading, profileData]);

  if (!showProfileWarning) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h2>
          <p className="text-gray-600">
            Your profile is incomplete. Please complete your business
            information to start receiving job leads and connect with customers.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowProfileWarning(false)}
            className="flex-1"
          >
            Later
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowProfileWarning(false);
              router.push("/trade-person/about");
            }}
            className="flex-1"
          >
            Complete Now
          </Button>
        </div>
      </div>
    </div>
  );
}
