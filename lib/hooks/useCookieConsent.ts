import { useEffect, useState } from "react";
import {
  useUpdateConsentsMutation,
  useGetConsentsQuery,
} from "@/store/slice/authSlice";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  advertisement: boolean;
}

export interface CookieExpiry {
  necessary: string; // "Session"
  analytics: string; // Date string
  advertisement: string; // Date string
}

const COOKIE_CONSENT_KEY = "tln_cookie_consent";
const COOKIE_CONSENT_EXPIRY_KEY = "tln_cookie_consent_expiry";
const COOKIE_CONSENT_EXPIRY_DAYS = 365;

// Check if user is logged in
const isUserLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");
  return !!token;
};

export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Redux hooks
  const [updateConsents] = useUpdateConsentsMutation();
  const { data: serverConsents, isLoading: isLoadingServer } =
    useGetConsentsQuery(undefined, {
      skip: !isUserLoggedIn(), // Skip if user not logged in
    });

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedExpiry = localStorage.getItem(COOKIE_CONSENT_EXPIRY_KEY);

    if (savedPreferences && savedExpiry) {
      const expiryDate = new Date(savedExpiry);
      if (new Date() < expiryDate) {
        setPreferences(JSON.parse(savedPreferences));
      } else {
        // Clear expired preferences
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        localStorage.removeItem(COOKIE_CONSENT_EXPIRY_KEY);
      }
    }

    setIsLoaded(true);
  }, []);

  // Load preferences from server if available and user is logged in
  useEffect(() => {
    if (isUserLoggedIn() && serverConsents && !isLoadingServer) {
      const serverPrefs: CookiePreferences = {
        necessary: true,
        analytics: serverConsents?.analytics ?? false,
        advertisement: serverConsents?.marketing ?? false, // Map marketing to advertisement
      };
      setPreferences(serverPrefs);
      // Also save to localStorage
      savePreferencesLocal(serverPrefs);
    }
  }, [serverConsents, isLoadingServer]);

  // Save preferences to localStorage
  const savePreferencesLocal = (newPreferences: CookiePreferences) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newPreferences));
    localStorage.setItem(COOKIE_CONSENT_EXPIRY_KEY, expiryDate.toISOString());

    setPreferences(newPreferences);
  };

  // Sync with server
  const syncWithServer = async (prefs: CookiePreferences) => {
    if (!isUserLoggedIn()) return;

    try {
      await updateConsents({
        analytics: prefs.analytics,
        marketing: prefs.advertisement, // Map advertisement to marketing
      }).unwrap();
    } catch (error) {
      console.error("Error syncing consents with server:", error);
    }
  };

  // Accept all cookies
  const acceptAll = async () => {
    const prefs = {
      necessary: true,
      analytics: true,
      advertisement: true,
    };
    savePreferencesLocal(prefs);
    await syncWithServer(prefs);
  };

  // Reject all non-necessary cookies
  const rejectAll = async () => {
    const prefs = {
      necessary: true,
      analytics: false,
      advertisement: false,
    };
    savePreferencesLocal(prefs);
    await syncWithServer(prefs);
  };

  // Save custom preferences
  const saveCustom = async (custom: Partial<CookiePreferences>) => {
    const prefs = {
      necessary: true, // Always required
      analytics: custom.analytics ?? false,
      advertisement: custom.advertisement ?? false,
    };
    savePreferencesLocal(prefs);
    await syncWithServer(prefs);
  };

  // Check if user has given consent
  const hasGivenConsent = () => {
    return preferences !== null;
  };

  return {
    preferences,
    isLoaded,
    savePreferences: savePreferencesLocal,
    acceptAll,
    rejectAll,
    saveCustom,
    hasGivenConsent,
    isLoadingServer,
  };
};
