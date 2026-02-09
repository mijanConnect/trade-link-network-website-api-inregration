import { useProfileQuery } from "@/store/slice/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getImageUrl } from "../ui/ImageURL";

interface ShowProfileModalProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export default function ShowProfileModal({
  setIsLoggedIn,
}: ShowProfileModalProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();

  const { data: profileData } = useProfileQuery({});

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfileModal(!showProfileModal)}
        className="rounded-sm overflow-hidden border border-primary hover:bg-primary/5 transition-colors flex items-center justify-center px-4 py-2 gap-2 cursor-pointer"
      >
        <p className="text-[16px] text-primaryText">My Account</p>

        <svg
          className="h-6 w-6 hamburger-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: showProfileModal ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          {showProfileModal ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          )}
        </svg>
      </button>

      {showProfileModal && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowProfileModal(false)}
          />

          <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-40 overflow-hidden">
            <div className="p-4 flex flex-col items-center border-b border-gray-200">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                {profileData?.profileImage ? (
                  <Image
                    src={getImageUrl(profileData.profileImage)}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
                    {profileData?.name
                      ? profileData.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-primaryText">
                {profileData?.name}
              </h3>

              <p className="text-sm text-gray-500">{profileData?.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  router.push("/my-jobs");
                  setShowProfileModal(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-primaryText"
              >
                My Jobs
              </button>

              <button
                onClick={() => {
                  router.push("/profile");
                  setShowProfileModal(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-primaryText"
              >
                View Profile
              </button>

              <button
                onClick={() => {
                  router.push("/trade-person");
                  setShowProfileModal(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-primaryText"
              >
                Switch to Tradeperson
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  toast.success("Logged out successfully!");
                  setShowProfileModal(false);
                  router.push("/login");
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
