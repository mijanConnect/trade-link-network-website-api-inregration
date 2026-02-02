"use client";

import { Provider } from "react-redux";
import store from "../store";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
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
    </Provider>
  );
}
