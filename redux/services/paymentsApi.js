import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import qs from "qs";

import {API_URL, AUTH_COOKIE_LS_NAME} from "@/lib/constants/config";

export const paymentApi = createApi({
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
    reducerPath: "paymentApi",
    endpoints: (builder) => ({
        getPaymentStatus: builder.query({
            query: ({ params }) => ({
                url: "/api/payment/status",
                params,
                method: "GET",
            }),
        }),
        createPayment: builder.mutation({
            query: ({ body }) => ({
                url: `/api/payment`,
                body,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useLazyGetPaymentStatusQuery,
    useCreatePaymentMutation
} = paymentApi;
