"use client";

import { store } from "./store";
import { Provider } from "react-redux";

import { AUTH_COOKIE_LS_NAME } from "@/lib/constants/config";

export function ReduxProvider({ value, children }) {
  const token = value.find((el) => el.name === AUTH_COOKIE_LS_NAME)?.value;

  if (token && typeof window !== "undefined") {
    localStorage.setItem(AUTH_COOKIE_LS_NAME, token);
  }

  return <Provider store={store}>{children}</Provider>;
}
