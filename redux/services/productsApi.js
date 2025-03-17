import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

import { API_URL, AUTH_COOKIE_LS_NAME } from "@/lib/constants/config";

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    paramsSerializer: (params) => qs.stringify(params),
    credentials: "include",
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem(AUTH_COOKIE_LS_NAME);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  reducerPath: "productsApi",
  endpoints: (builder) => ({
    getPopularProducts: builder.query({
      query: () => "/api/market/products/popular",
      method: "GET",
    }),
    getProducts: builder.query({
      query: ({ params }) => ({
        url: "/api/market/products",
        params,
        method: "GET",
      }),
    }),
    buyProducts: builder.mutation({
      query: ({ body }) => ({
        url: `/api/orders`,
        body,
        method: "POST",
      }),
    }),
    getOrderPrice: builder.query({
      query: ({ params }) => ({
        url: "/api/orders/price",
        params,
        method: "GET",
      }),
    }),
    getOrderDetails: builder.query({
      query: ({ params }) => ({
        url: "/api/orders/details",
        params,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPopularProductsQuery,
  useLazyGetProductsQuery,
  useBuyProductsMutation,
  useLazyGetOrderPriceQuery,
  useGetOrderDetailsQuery,
} = productsApi;
