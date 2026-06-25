"use client";

import { Provider } from "react-redux";
import store from "../store";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import CookiePolicyPopup from "./components/CookiePolicyPopup";
import { CookiePolicyProvider } from "@/lib/context/CookiePolicyContext";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import PageLoader from "./components/PageLoader";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Sync localStorage accessToken to cookies for Next.js middleware
    const token = localStorage.getItem("accessToken");
    if (token) {
      document.cookie = `accessToken=${token}; path=/; max-age=86400;`;
    } else {
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
  }, []);

  return (
    <Provider store={store}>
      <CookiePolicyProvider>
        <LoadingProvider>
          <PageLoader />
          {children}
          <CookiePolicyPopup />
          <Toaster
            position="bottom-right"
            theme="light"
            richColors
            toastOptions={{
              style: {
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                padding: "16px",
              },
            }}
          />
        </LoadingProvider>
      </CookiePolicyProvider>
    </Provider>
  );
}
