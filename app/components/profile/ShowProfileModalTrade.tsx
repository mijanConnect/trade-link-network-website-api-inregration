import { useProfileQuery, useWalletQuery } from "@/store/slice/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getImageUrl } from "../ui/ImageURL";
import { UserCircle } from "lucide-react";

interface ShowProfileModalProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export default function ShowProfileModalTrade({
  setIsLoggedIn,
}: ShowProfileModalProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();

  const { data: profileData } = useProfileQuery({});
  const { data: walletData } = useWalletQuery({});

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfileModal(!showProfileModal)}
        className="rounded-sm overflow-hidden border border-primary hover:bg-gray-50 transition-colors flex items-center justify-center px-4 py-2 gap-2 cursor-pointer"
      >
        <div className="flex items-center gap-1">
          <UserCircle size={20} className="text-primary" />
        </div>
        <p className="text-[16px] text-primaryText">My Account</p>
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
      </button>

      {showProfileModal && (
        <>
          <div
            className="fixed inset-0 z-50"
            onClick={() => setShowProfileModal(false)}
          />

          <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
            <div className="p-4 flex flex-col items-center border-b border-gray-200">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                {profileData?.professional?.businessImage ? (
                  <Image
                    src={getImageUrl(profileData.professional.businessImage)}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    unoptimized
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

              <div className="flex gap-1 items-center bg-primary text-white rounded-sm px-3 py-1 mt-2">
                <p>Wallet Balance:</p>
                <p>{walletData?.balance || 0}</p>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  router.push("/trade-person/about");
                  setShowProfileModal(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-primaryText"
              >
                About
              </button>

              <button
                onClick={() => {
                  router.push("/trade-person/reviews");
                  setShowProfileModal(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-primaryText"
              >
                Reviews
              </button>

              <button
                onClick={() => {
                  router.push("/");
                  setShowProfileModal(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md transition-colors text-primaryText"
              >
                Go to Home
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  toast.success("Logged out successfully!");
                  setShowProfileModal(false);
                  router.push("/");
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
