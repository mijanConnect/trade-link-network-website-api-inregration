/**
 * Application Configuration
 * This file centrally manages all external URLs and configuration values
 * Update these values for different environments (development, staging, production)
 */

export const config = {
  // External Trade Person Application URL
  // Change this URL for different deployments
  TRADE_PERSON_BASE_URL:
    process.env.NEXT_PUBLIC_TRADE_PERSON_URL || "http://10.10.7.26:3001",

  // Trade Person Dashboard Route
  TRADE_PERSON_DASHBOARD: "/trade-person",

  // Full URL to redirect PROFESSIONAL users after login
  get TRADE_PERSON_REDIRECT_URL() {
    return `${this.TRADE_PERSON_BASE_URL}${this.TRADE_PERSON_DASHBOARD}/`;
  },
};

export default config;
