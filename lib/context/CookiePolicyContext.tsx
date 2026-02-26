import { createContext, useContext, useState, ReactNode } from "react";

interface CookiePolicyContextType {
  showCookiePolicy: boolean;
  openCookiePolicy: () => void;
  closeCookiePolicy: () => void;
  toggleCookiePolicy: () => void;
}

const CookiePolicyContext = createContext<CookiePolicyContextType | undefined>(
  undefined
);

export function CookiePolicyProvider({ children }: { children: ReactNode }) {
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);

  const openCookiePolicy = () => setShowCookiePolicy(true);
  const closeCookiePolicy = () => setShowCookiePolicy(false);
  const toggleCookiePolicy = () => setShowCookiePolicy((prev) => !prev);

  return (
    <CookiePolicyContext.Provider
      value={{
        showCookiePolicy,
        openCookiePolicy,
        closeCookiePolicy,
        toggleCookiePolicy,
      }}
    >
      {children}
    </CookiePolicyContext.Provider>
  );
}

export function useCookiePolicy() {
  const context = useContext(CookiePolicyContext);
  if (!context) {
    throw new Error(
      "useCookiePolicy must be used within CookiePolicyProvider"
    );
  }
  return context;
}
