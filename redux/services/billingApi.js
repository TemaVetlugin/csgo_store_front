import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

import { API_URL } from "@/lib/constants/config";

export const billingApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    paramsSerializer: (params) => qs.stringify(params),
  }),
  reducerPath: "billingApi",
  endpoints: (builder) => ({
    sendBillingDetails: builder.mutation({
      query: (body) => ({
        url: `/api/billing`, // Укажите правильный endpoint для вашего бэкенда
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendBillingDetailsMutation } = billingApi;