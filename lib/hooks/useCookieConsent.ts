import { useEffect, useState } from "react";

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

export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Save preferences to localStorage
  const savePreferences = (newPreferences: CookiePreferences) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newPreferences));
    localStorage.setItem(COOKIE_CONSENT_EXPIRY_KEY, expiryDate.toISOString());

    setPreferences(newPreferences);
  };

  // Accept all cookies
  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      advertisement: true,
    });
  };

  // Reject all non-necessary cookies
  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      advertisement: false,
    });
  };

  // Save custom preferences
  const saveCustom = (custom: Partial<CookiePreferences>) => {
    savePreferences({
      necessary: true, // Always required
      analytics: custom.analytics ?? false,
      advertisement: custom.advertisement ?? false,
    });
  };

  // Check if user has given consent
  const hasGivenConsent = () => {
    return preferences !== null;
  };

  return {
    preferences,
    isLoaded,
    savePreferences,
    acceptAll,
    rejectAll,
    saveCustom,
    hasGivenConsent,
  };
};
