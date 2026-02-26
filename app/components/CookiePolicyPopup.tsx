"use client";

import { useState, useEffect } from "react";
import { useCookieConsent } from "@/lib/hooks/useCookieConsent";
import { useCookiePolicy } from "@/lib/context/CookiePolicyContext";
import { X, ChevronDown } from "lucide-react";

interface CookieExpiry {
  necessary: string;
  analytics: string;
  advertisement: string;
}

export default function CookiePolicyPopup() {
  const {
    preferences,
    isLoaded,
    acceptAll,
    rejectAll,
    saveCustom,
    hasGivenConsent,
  } = useCookieConsent();

  const { showCookiePolicy, closeCookiePolicy } = useCookiePolicy();

  const [showCustomization, setShowCustomization] = useState(false);
  const [expandedCookie, setExpandedCookie] = useState<string | null>(null);
  const [customPreferences, setCustomPreferences] = useState({
    analytics: preferences?.analytics ?? false,
    advertisement: preferences?.advertisement ?? false,
  });
  const [expiryDates, setExpiryDates] = useState<CookieExpiry>({
    necessary: "Session",
    analytics: "",
    advertisement: "",
  });

  // Display popup on first load if no consent given OR context shows it
  const shouldShow = isLoaded && (!hasGivenConsent() || showCookiePolicy);

  // Calculate expiry dates for each cookie type
  useEffect(() => {
    const analyticsExpiry = new Date();
    analyticsExpiry.setDate(analyticsExpiry.getDate() + 365);

    const advertisementExpiry = new Date();
    advertisementExpiry.setDate(advertisementExpiry.getDate() + 365);

    setExpiryDates({
      necessary: "Session (until browser closes)",
      analytics: analyticsExpiry.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      advertisement: advertisementExpiry.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  }, []);

  // Update custom preferences when preferences change
  useEffect(() => {
    if (preferences) {
      setCustomPreferences({
        analytics: preferences.analytics,
        advertisement: preferences.advertisement,
      });
    }
  }, [preferences]);

  const handleAcceptAll = () => {
    acceptAll();
    closeCookiePolicy();
    setShowCustomization(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    closeCookiePolicy();
    setShowCustomization(false);
  };

  const handleSaveCustom = () => {
    saveCustom(customPreferences);
    closeCookiePolicy();
    setShowCustomization(false);
  };

  const handleToggle = (type: "analytics" | "advertisement") => {
    setCustomPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-[600px] h-[650px] max-w-full max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Cookie Policy</h2>
            <p className="text-xs text-gray-500 mt-1">UK GDPR Compliant</p>
          </div>
          <button
            onClick={() => {
              closeCookiePolicy();
              setShowCustomization(false);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors ml-4"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main View */}
        {!showCustomization ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-900 font-semibold">
                  Your Explicit Consent Required
                </p>
                <p className="text-xs text-amber-800 mt-2">
                  We process your personal data based on your explicit consent
                  under UK GDPR. You can change your preferences at any time.
                </p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site
                usage, and serve personalized ads. Please manage your
                preferences below. Your consent is completely optional.
              </p>

              {/* Cookie Types Info */}
              <div className="space-y-2 mt-6">
                {/* Necessary - Always enabled */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCookie(
                        expandedCookie === "necessary" ? null : "necessary",
                      )
                    }
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 text-left">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="mt-1 w-4 h-4 rounded accent-blue-600"
                      />
                      <div className="flex-1">
                        <label className="font-semibold text-gray-900 block text-sm">
                          Necessary Cookies
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Essential for site functionality
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform ${
                        expandedCookie === "necessary" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedCookie === "necessary" && (
                    <div className="p-3 bg-white border-t border-gray-200 max-h-[300px] overflow-y-auto">
                      <p className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">Expires:</span>{" "}
                        {expiryDates.necessary}
                      </p>
                      <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">
                            Examples:
                          </p>
                          <ul className="text-xs text-gray-600 mt-1 space-y-1 ml-2">
                            <li>
                              <span className="font-semibold">
                                CrossConsent
                              </span>{" "}
                              - Stores user cookie consent state
                            </li>
                            <li>
                              <span className="font-semibold">Type:</span> HTTP
                              Cookie
                            </li>
                            <li>
                              <span className="font-semibold">Duration:</span>{" "}
                              Session
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        <span className="font-semibold">UK GDPR:</span> No
                        consent required. Essential for website functionality
                        and security under Article 6(1)(b) GDPR.
                      </p>
                    </div>
                  )}
                </div>

                {/* Analytics */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCookie(
                        expandedCookie === "analytics" ? null : "analytics",
                      )
                    }
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 text-left">
                      <input
                        type="checkbox"
                        checked={customPreferences.analytics}
                        onChange={() => handleToggle("analytics")}
                        className="mt-1 w-4 h-4 rounded accent-blue-600 cursor-pointer"
                      />
                      <div className="flex-1">
                        <label className="font-semibold text-gray-900 block text-sm cursor-pointer">
                          Analytics
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Help us understand how you use our site
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform ${
                        expandedCookie === "analytics" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedCookie === "analytics" && (
                    <div className="p-3 bg-white border-t border-gray-200 max-h-[300px] overflow-y-auto">
                      <p className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">Expires:</span>{" "}
                        {expiryDates.analytics}
                      </p>
                      <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">
                            Examples:
                          </p>
                          <ul className="text-xs text-gray-600 mt-1 space-y-1 ml-2">
                            <li>
                              <span className="font-semibold">_ga</span> -
                              Tracks user interactions and visits
                            </li>
                            <li>
                              <span className="font-semibold">Type:</span> HTTP
                              Cookie
                            </li>
                            <li>
                              <span className="font-semibold">Duration:</span>{" "}
                              {expiryDates.analytics}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        <span className="font-semibold">UK GDPR:</span> Explicit
                        consent required under Article 7 GDPR. You can withdraw
                        consent anytime.
                      </p>
                    </div>
                  )}
                </div>

                {/* Advertisement */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCookie(
                        expandedCookie === "advertisement"
                          ? null
                          : "advertisement",
                      )
                    }
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 text-left">
                      <input
                        type="checkbox"
                        checked={customPreferences.advertisement}
                        onChange={() => handleToggle("advertisement")}
                        className="mt-1 w-4 h-4 rounded accent-blue-600 cursor-pointer"
                      />
                      <div className="flex-1">
                        <label className="font-semibold text-gray-900 block text-sm cursor-pointer">
                          Advertisement
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Personalized ads based on your interests
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform ${
                        expandedCookie === "advertisement" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedCookie === "advertisement" && (
                    <div className="p-3 bg-white border-t border-gray-200 max-h-[300px] overflow-y-auto">
                      <p className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">Expires:</span>{" "}
                        {expiryDates.advertisement}
                      </p>
                      <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">
                            Examples:
                          </p>
                          <ul className="text-xs text-gray-600 mt-1 space-y-1 ml-2">
                            <li>
                              <span className="font-semibold">IDE</span> -
                              Stores user interests and browsing history
                            </li>
                            <li>
                              <span className="font-semibold">Type:</span> HTTP
                              Cookie
                            </li>
                            <li>
                              <span className="font-semibold">Duration:</span>{" "}
                              {expiryDates.advertisement}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        <span className="font-semibold">UK GDPR:</span> Explicit
                        consent required under Article 7 GDPR for profiling and
                        targeted marketing.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons - Fixed at Bottom */}
            <div className="flex-none border-t border-gray-200 p-6 space-y-3 bg-white rounded-lg">
              <div className="flex gap-3">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Accept All
                </button>
              </div>

              {/* Customize & User Rights Link */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowCustomization(true)}
                  className="w-full px-4 py-2 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  Customize Preferences
                </button>
                <p className="text-xs text-gray-500 text-center">
                  You have the right to withdraw consent or access your data
                  anytime.
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:text-blue-700 ml-1"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Customization View */
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <button
                onClick={() => setShowCustomization(false)}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1 mb-4"
              >
                ← Back
              </button>

              <h3 className="font-semibold text-gray-900">
                Customize Your Preferences
              </h3>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  <span className="font-semibold">UK GDPR Compliance:</span>{" "}
                  Your consent is voluntary and can be withdrawn anytime from
                  your account settings.
                </p>
              </div>

              <div className="space-y-2">
                {/* Necessary - Always enabled */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCookie(
                        expandedCookie === "necessary" ? null : "necessary",
                      )
                    }
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between flex-1 text-left">
                      <div>
                        <label className="font-semibold text-gray-900 text-sm">
                          Necessary Cookies
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Always enabled
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-4 h-4 rounded accent-blue-600 ml-3"
                      />
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform ml-2 ${
                        expandedCookie === "necessary" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedCookie === "necessary" && (
                    <div className="p-3 bg-white border-t border-gray-200 max-h-[300px] overflow-y-auto">
                      <p className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">Expires:</span>{" "}
                        {expiryDates.necessary}
                      </p>
                      <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">
                            Examples:
                          </p>
                          <ul className="text-xs text-gray-600 mt-1 space-y-1 ml-2">
                            <li>
                              <span className="font-semibold">
                                CrossConsent
                              </span>{" "}
                              - Stores user cookie consent state
                            </li>
                            <li>
                              <span className="font-semibold">Type:</span> HTTP
                              Cookie
                            </li>
                            <li>
                              <span className="font-semibold">Duration:</span>{" "}
                              Session
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analytics Toggle */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCookie(
                        expandedCookie === "analytics" ? null : "analytics",
                      )
                    }
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between flex-1 text-left">
                      <div>
                        <label className="font-semibold text-gray-900 text-sm">
                          Analytics
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Usage statistics
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={customPreferences.analytics}
                        onChange={() => handleToggle("analytics")}
                        className="w-4 h-4 rounded accent-blue-600 cursor-pointer ml-3"
                      />
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform ml-2 ${
                        expandedCookie === "analytics" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedCookie === "analytics" && (
                    <div className="p-3 bg-white border-t border-gray-200 max-h-[300px] overflow-y-auto">
                      <p className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">Expires:</span>{" "}
                        {expiryDates.analytics}
                      </p>
                      <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">
                            Examples:
                          </p>
                          <ul className="text-xs text-gray-600 mt-1 space-y-1 ml-2">
                            <li>
                              <span className="font-semibold">_ga</span> -
                              Tracks user interactions and visits
                            </li>
                            <li>
                              <span className="font-semibold">Type:</span> HTTP
                              Cookie
                            </li>
                            <li>
                              <span className="font-semibold">Duration:</span>{" "}
                              {expiryDates.analytics}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        <span className="font-semibold">UK GDPR:</span> Requires
                        explicit consent.
                      </p>
                    </div>
                  )}
                </div>

                {/* Advertisement Toggle */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedCookie(
                        expandedCookie === "advertisement"
                          ? null
                          : "advertisement",
                      )
                    }
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between flex-1 text-left">
                      <div>
                        <label className="font-semibold text-gray-900 text-sm">
                          Advertisement
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Personalized ads
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={customPreferences.advertisement}
                        onChange={() => handleToggle("advertisement")}
                        className="w-4 h-4 rounded accent-blue-600 cursor-pointer ml-3"
                      />
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform ml-2 ${
                        expandedCookie === "advertisement" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedCookie === "advertisement" && (
                    <div className="p-3 bg-white border-t border-gray-200 max-h-[300px] overflow-y-auto">
                      <p className="text-xs text-gray-600 mb-2">
                        <span className="font-semibold">Expires:</span>{" "}
                        {expiryDates.advertisement}
                      </p>
                      <div className="space-y-2 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs font-semibold text-gray-700">
                            Examples:
                          </p>
                          <ul className="text-xs text-gray-600 mt-1 space-y-1 ml-2">
                            <li>
                              <span className="font-semibold">IDE</span> -
                              Stores user interests and browsing history
                            </li>
                            <li>
                              <span className="font-semibold">Type:</span> HTTP
                              Cookie
                            </li>
                            <li>
                              <span className="font-semibold">Duration:</span>{" "}
                              {expiryDates.advertisement}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        <span className="font-semibold">UK GDPR:</span> Requires
                        explicit consent for profiling & targeted marketing.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button - Fixed at Bottom */}
            <div className="flex-none border-t border-gray-200 p-6 bg-white">
              <button
                onClick={handleSaveCustom}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
