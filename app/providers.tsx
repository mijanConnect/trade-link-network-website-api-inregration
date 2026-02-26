"use client";

import { Provider } from "react-redux";
import store from "../store";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import CookiePolicyPopup from "./components/CookiePolicyPopup";
import { CookiePolicyProvider } from "@/lib/context/CookiePolicyContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <CookiePolicyProvider>
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
      </CookiePolicyProvider>
    </Provider>
  );
}
