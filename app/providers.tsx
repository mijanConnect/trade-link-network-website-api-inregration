"use client";

import { Provider } from "react-redux";
import store from "../store";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import CookiePolicyPopup from "./components/CookiePolicyPopup";
import { CookiePolicyProvider } from "@/lib/context/CookiePolicyContext";
import { LoadingProvider } from "@/lib/context/LoadingContext";
import PageLoader from "./components/PageLoader";

export default function Providers({ children }: { children: ReactNode }) {
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
