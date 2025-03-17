// contactApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";
import { API_URL } from "@/lib/constants/config";

export const contactApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    paramsSerializer: (params) => qs.stringify(params),
  }),
  reducerPath: "contactApi",
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation({
      query: ({ body }) => ({
        url: `/api/contact-us`,
        body,
        method: "POST",
      }),
    }),
    sendBillingDetails: builder.mutation({
      query: ({ body }) => ({
        url: `/api/billing-details`,
        body,
        method: "POST",
      }),
    }),
  }),
});

export const { useSendContactMessageMutation, useSendBillingDetailsMutation } = contactApi;
