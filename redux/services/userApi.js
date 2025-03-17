import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, AUTH_COOKIE_LS_NAME } from "@/lib/constants/config";

export const userApi = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem(AUTH_COOKIE_LS_NAME);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  reducerPath: "userApi",
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    getAuthenticatedUser: builder.query({
      query: () => ({
        url: `/api/user`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateAuthenticatedUser: builder.mutation({
      query: ({ body }) => ({
        url: `/api/user`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    logoutAuthenticatedUser: builder.query({
      query: () => ({
        url: `/logout`,
        method: "GET",
      }),
    }),

    getUserTransactions: builder.query({
      query: ({ params }) => ({
        url: `/api/user/transactions`,
        params,
        method: "GET",
      }),
    }),
    verifyEmail: builder.query({
      query: ({}) => ({
        url: `/api/user/email`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAuthenticatedUserQuery,
  useUpdateAuthenticatedUserMutation,

  useLazyLogoutAuthenticatedUserQuery,

  useLazyGetUserTransactionsQuery,
  useLazyVerifyEmailQuery,
} = userApi;
