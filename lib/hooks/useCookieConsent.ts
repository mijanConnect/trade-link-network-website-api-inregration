"use client";

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

// Helper to set cookie
const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === "undefined") return;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  const cookieString = `${name}=${encodeURIComponent(value)}; Path=/; Expires=${expiryDate.toUTCString()}; SameSite=Lax`;
  document.cookie = cookieString;
};

// Helper to get cookie
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
};

// Helper to delete cookie
const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

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

  // Load preferences from Cookies
  useEffect(() => {
    const savedPreferences = getCookie(COOKIE_CONSENT_KEY);
    const savedExpiry = getCookie(COOKIE_CONSENT_EXPIRY_KEY);

    if (savedPreferences && savedExpiry) {
      const expiryDate = new Date(savedExpiry);
      if (new Date() < expiryDate) {
        setPreferences(JSON.parse(savedPreferences));
      } else {
        // Clear expired preferences
        deleteCookie(COOKIE_CONSENT_KEY);
        deleteCookie(COOKIE_CONSENT_EXPIRY_KEY);
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
      // Also save to Cookies
      savePreferencesLocal(serverPrefs);
    }
  }, [serverConsents, isLoadingServer]);

  // Save preferences to Cookies
  const savePreferencesLocal = (newPreferences: CookiePreferences) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);

    setCookie(
      COOKIE_CONSENT_KEY,
      JSON.stringify(newPreferences),
      COOKIE_CONSENT_EXPIRY_DAYS,
    );
    setCookie(
      COOKIE_CONSENT_EXPIRY_KEY,
      expiryDate.toISOString(),
      COOKIE_CONSENT_EXPIRY_DAYS,
    );

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
