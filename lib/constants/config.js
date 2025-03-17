export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_PAYMENT_PK_KEY = process.env.NEXT_PUBLIC_API_PAYMENT_PK_KEY;
export const API_PAYMENT_DEFAULT_LANG =
  process.env.NEXT_PUBLIC_API_PAYMENT_DEFAULT_LANG || "ru";

export const STEAM_SIGN_IN_URL = API_URL + "/auth/steam/login";

export const LOGOUT_URL = API_URL + "/logout";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export const AUTH_COOKIE_LS_NAME = "AUTH-TOKEN";
export const API_PAYMNET_ORDER_LS_NAME = "PAYMENT-ORDER";
export const API_PAYMNET_ORDER_ITEMS_LS_NAME = "PAYMENT-ORDER-ITEMS";
