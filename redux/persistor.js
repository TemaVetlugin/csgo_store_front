"use client";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/redux/store";

let persistor = persistStore(store);

export const PersistorProvider = ({ children }) => {
  return <PersistGate persistor={persistor}>{children}</PersistGate>;
};
