import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import mainSlice from "./features/mainSlice";
import authSlice from "./features/authSlice";
import cartSlice from "./features/cartSlice";

import { userApi } from "./services/userApi";
import { productsApi } from "./services/productsApi";
import { contactApi } from "./services/contactApi";
import {paymentApi} from "@/redux/services/paymentsApi";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    auth: authSlice,
    cart: cartSlice,
    [userApi.reducerPath]: userApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      userApi.middleware,
      productsApi.middleware,
      paymentApi.middleware,
      contactApi.middleware,
    ]),
  // only enable dev tools in development environment
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);
